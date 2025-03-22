import { AuthTokens } from '@/domain/entities/auth.entities';
import { Credentials, Profile } from '@/domain/entities/user.entities';
import {
  DisplayName,
  Email,
  Password,
  Username,
} from '@/domain/values/user.values';
import { CredentialsRepository } from '@/infra/database/repositories/credentials.repositories';
import { IProfileRepository } from '@/infra/database/repositories/profile.repositories';
import { ITransactionManager } from '@/infra/database/repositories/transaction.repositories';
import { IRedisProvider } from '@/infra/nest-providers/auth.providers';
import { JWTService } from '@/infra/services/jwt.services';
import { hashPassword, verifyPassword } from '@/infra/utils/password.utils';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import {
  UserAlreadyExistsError,
  InvalidCredentialsError,
  InvalidRefreshTokenError,
} from '@/logic/exceptions/auth.exceptions';

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
  Profile
> {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly profileRepository: IProfileRepository,
    private readonly transationManager: ITransactionManager,
  ) {
    super();
  }

  async execute(command: RegisterCommand): Promise<Profile> {
    console.log('НАЧАЛО МЕТОДА');
    const username = new Username(command.username);
    const email = new Email(command.email);
    const hashedPassword = await hashPassword(command.password);
    const password = new Password(hashedPassword);
    const credentials = new Credentials(username, email, password);
    const displayName = new DisplayName(credentials.username);
    const profile = new Profile(displayName, credentials);

    console.log('ПЕРЕД ВХОДОМ В ТРАНЗАКЦИЮ');
    return await this.transationManager
      .transaction(async () => {
        console.log('ПОПАЛИ В ТРАНЗАКЦИЮ');
        const existingUser =
          await this.credentialsRepository.findByEmailOrUsername(
            credentials.email,
            credentials.username,
          );

        if (existingUser) {
          throw new UserAlreadyExistsError(
            'User with given username or email already exists',
          );
        }

        await this.credentialsRepository.create(credentials);
        await this.profileRepository.create(profile);

        return profile;
      })
      .catch((error) => {
        console.error('Ошибка в транзакции', error);
        throw error;
      });
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

    return authData;
  }
}

export class RefreshCommand extends BaseCommand {
  constructor(public readonly refreshToken: string) {
    super();
  }
}

export class RefreshCommandHandler extends ICommandHandler<
  RefreshCommand,
  AuthTokens
> {
  constructor(
    protected readonly jwtService: JWTService,
    protected readonly redisService: IRedisProvider,
  ) {
    super();
  }

  async execute(command: RefreshCommand): Promise<AuthTokens> {
    const credentialsId = await this.redisService.connection.get(
      command.refreshToken,
    );

    if (!credentialsId) {
      throw new InvalidRefreshTokenError('Invalid refresh token');
    }

    const authData = this.jwtService.generateAuthTokens(credentialsId);
    await this.redisService.connection.del(command.refreshToken);

    await this.redisService.connection.set(
      authData.refreshToken,
      credentialsId,
      {
        EX: authData.refreshExpires,
      },
    );

    return authData;
  }
}
