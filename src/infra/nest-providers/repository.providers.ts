import { Provider } from '@nestjs/common';
import {
  CredentialsRepository,
  ICredentialsRepository,
} from '@/infra/database/repositories/credentials.repositories';
import { DataSource } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';
import { ProfileModel } from '@/infra/database/models/profile.model';
import {
  ProfileRepository,
  IProfileRepository,
} from '@/infra/database/repositories/profile.repositories';
import {
  ITransactionManager,
  TypeOrmTransactionManager,
} from '@/infra/database/repositories/transaction.repositories';
import {
  ChannelsRepository,
  IChannelsRepository,
} from '@/infra/database/repositories/channels.repositories';
import { ChannelsModel } from '@/infra/database/models/channel.model';
import {
  ChannelMembersRepository,
  IChannelMembersRepository,
} from '@/infra/database/repositories/members.repositories';
import { ChannelMemberModel } from '@/infra/database/models/member.model';

export const TransactionManagerProvider: Provider = {
  provide: ITransactionManager,
  useClass: TypeOrmTransactionManager,
};

export const CredentialsRepositoryProvider: Provider = {
  provide: ICredentialsRepository,
  useFactory: (dataSource: DataSource) => {
    const repository = dataSource.getRepository(CredentialsModel);
    return new CredentialsRepository(repository);
  },
  inject: [DataSource],
};

export const ProfileRepositoryProvider: Provider = {
  provide: IProfileRepository,
  useFactory: (DataSource: DataSource) => {
    const repository = DataSource.getRepository(ProfileModel);
    return new ProfileRepository(repository);
  },
  inject: [DataSource],
};

export const ChannelsRepositoryProvider: Provider = {
  provide: IChannelsRepository,
  useFactory: (DataSource: DataSource) => {
    const repository = DataSource.getRepository(ChannelsModel);
    return new ChannelsRepository(repository);
  },
  inject: [DataSource],
};

export const ChannelMembersRepositoryProvider: Provider = {
  provide: IChannelMembersRepository,
  useFactory: (DataSource: DataSource) => {
    const repository = DataSource.getRepository(ChannelMemberModel);
    return new ChannelMembersRepository(repository);
  },
  inject: [DataSource],
};
