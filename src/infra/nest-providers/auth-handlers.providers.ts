import { Credentials } from '@/domain/entities/user.entities';
import {
  RegisterCommand,
  RegisterCommandHandler,
} from '@/logic/commands/auth.command';
import { ICommandHandler } from '@/logic/commands/base.command';
import { Provider } from '@nestjs/common';
import { CredentialsRepository } from '@/infra/database/repositories/credentials.repositoies';
import { DataSource } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';

export abstract class IRegisterCommandHandler extends ICommandHandler<
  RegisterCommand,
  Credentials
> {}

export const CredentialsRepositoryProvider: Provider = {
  provide: CredentialsRepository,
  useFactory: (dataSource: DataSource) => {
    const repository = dataSource.getRepository(CredentialsModel);
    return new CredentialsRepository(repository);
  },
  inject: [DataSource],
};

export const NestJsRegisterCommandHandlerProvider: Provider = {
  provide: IRegisterCommandHandler,
  useFactory: (credentialsRepository: CredentialsRepository) => {
    return new RegisterCommandHandler(credentialsRepository);
  },
  inject: [CredentialsRepository],
};
