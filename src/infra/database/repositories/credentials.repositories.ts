import { EntityManager, Repository } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';
import { Credentials } from '@/domain/entities/user.entities';

export class CredentialsRepository {
  private readonly credentialsRepository: Repository<CredentialsModel>;

  constructor(repository: Repository<CredentialsModel>) {
    this.credentialsRepository = repository;
  }

  async findByEmailOrUsername(
    email: string | undefined,
    username: string | undefined,
  ): Promise<CredentialsModel | null> {
    return await this.credentialsRepository.findOne({
      where: [{ email: email }, { username: username }],
    });
  }

  async create(
    credentials: Credentials,
    manager?: EntityManager,
  ): Promise<CredentialsModel> {
    const credentialsModel = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      created_at: credentials.createdAt,
      updated_at: credentials.updatedAt,
    };

    const repository =
      manager?.getRepository(CredentialsModel) ?? this.credentialsRepository;
    const newCredentials = repository.create(credentialsModel);
    return await this.credentialsRepository.save(newCredentials);
  }
}
