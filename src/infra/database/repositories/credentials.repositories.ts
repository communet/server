import { EntityManager, Repository } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';
import { Credentials } from '@/domain/entities/user.entities';

export abstract class ICredentialsRepository {
  abstract findByEmailOrUsername(
    email: string | undefined,
    username: string | undefined,
  ): Promise<CredentialsModel | null>;

  abstract create(
    credentials: Credentials,
    manager?: EntityManager,
  ): Promise<CredentialsModel>;
}

export class CredentialsRepository extends ICredentialsRepository {
  constructor(
    protected readonly credentialsRepository: Repository<CredentialsModel>,
  ) {
    super();
  }

  async findByEmailOrUsername(
    email: string | undefined,
    username: string | undefined,
  ): Promise<CredentialsModel | null> {
    return await this.credentialsRepository.findOne({
      where: [{ email: email }, { username: username }],
      relations: ['profile'],
    });
  }

  async create(
    credentials: Credentials,
    manager?: EntityManager,
  ): Promise<CredentialsModel> {
    const credentialsModel = {
      id: String(credentials.oid),
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };

    const repository =
      manager?.getRepository(CredentialsModel) ?? this.credentialsRepository;
    const newCredentials = repository.create(credentialsModel);
    return await repository.save(newCredentials);
  }
}
