import { Repository } from 'typeorm';
import { CredentialsModel } from '@/infra/database/models/credentials.model';
import { Credentials } from '@/domain/entities/user.entities';

export class CredentialsRepository {
  private readonly credentialsRepository: Repository<CredentialsModel>;

  constructor(repository: Repository<CredentialsModel>) {
    this.credentialsRepository = repository;
  }

  async findByEmailOrUsername(
    credentials: Credentials,
  ): Promise<CredentialsModel | null> {
    return await this.credentialsRepository.findOne({
      where: [{ email: credentials.email }, { username: credentials.username }],
    });
  }

  async create(credentials: Credentials): Promise<CredentialsModel> {
    const credentialsModel = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      created_at: credentials.createdAt,
      updated_at: credentials.updatedAt,
    };

    const newCredentials = this.credentialsRepository.create(credentialsModel);
    return await this.credentialsRepository.save(newCredentials);
  }
}
