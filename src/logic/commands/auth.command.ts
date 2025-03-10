import { Credentials } from '@/domain/entities/user.entities';
import { Email, Password, Username } from '@/domain/values/user.values';
import { CredentialsRepository } from '@/infra/database/repositories/credentials.repositoies';
import { hashPassword } from '@/infra/utils/password.utils';
import { BaseCommand, ICommandHandler } from '@/logic/commands/base.command';
import { UserAlreadyExistsError } from '@/logic/exceptions/user.exceptions';

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

    const existingUser =
      await this.credentialsRepository.findByEmailOrUsername(credentials);

    if (existingUser) {
      throw new UserAlreadyExistsError(
        'User with given username or email already exists',
      );
    }

    await this.credentialsRepository.create(credentials);

    return credentials;
  }
}
