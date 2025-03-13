import { AuthTokens } from '@/domain/entities/auth.entities';
import { Credentials } from '@/domain/entities/user.entities';
import { Email, Password, Username } from '@/domain/values/user.values';
import { CredentialsRepository } from '@/infra/database/repositories/credentials.repositoies';
import { IRedisProvider } from '@/infra/nest-providers/auth.providers';
import { JWTService } from '@/infra/services/jwt.services';
import { hashPassword, verifyPassword } from '@/infra/utils/password.utils';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
} from '@/logic/exceptions/user.exceptions';

export class RegisterCommand extends BaseCommand {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}

export class RegisterCommandHandler extends ICommandHandler<
  RegisterCommand,
  Credentials
> {
  constructor(private readonly credentialsRepository: CredentialsRepository) {
    super();
  }

  async execute(command: RegisterCommand): Promise<Credentials> {
    const username = new Username(command.username);
    const email = new Email(command.email);
    const hashedPassword = await hashPassword(command.password);
    const password = new Password(hashedPassword);
    const credentials = new Credentials(username, email, password);

    const existingUser = await this.credentialsRepository.findByEmailOrUsername(
      credentials.email,
      credentials.username,
    );

    if (existingUser) {
      throw new UserAlreadyExistsError(
        'User with given username or email already exists',
      );
    }

    await this.credentialsRepository.create(credentials);

    return credentials;
  }
}

export class LoginCommand extends BaseCommand {
  constructor(
    public readonly username: string | undefined,
    public readonly email: string | undefined,
    public readonly password: string,
  ) {
    super();
  }
}

export class LoginCommandHandler extends ICommandHandler<
  LoginCommand,
  AuthTokens
> {
  constructor(
    protected readonly credentialsRepository: CredentialsRepository,
    protected readonly jwtService: JWTService,
    protected readonly redisService: IRedisProvider,
  ) {
    super();
  }

  async execute(command: LoginCommand): Promise<AuthTokens> {
    const credentials = await this.credentialsRepository.findByEmailOrUsername(
      command.email,
      command.username,
    );
    if (!credentials) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const isValidPassword = await verifyPassword(
      command.password,
      credentials.password,
    );
    if (!isValidPassword) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const authData = this.jwtService.generateAuthTokens(credentials.id);
    await this.redisService.connection.set(
      authData.refreshToken,
      credentials.id,
      {
        EX: authData.refreshExpires,
      },
    );

    return new AuthTokens(
      authData.accessToken,
      authData.accessExpires,
      authData.refreshToken,
      authData.refreshExpires,
    );
  }
}
