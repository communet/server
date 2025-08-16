import { UserEntity } from '../../core/entities';
import { GetUserByIdQuery, LoadUserByIdPort } from '../../core/ports';

export class GetUserByIdService implements GetUserByIdQuery {
  constructor(private readonly loadUserPort: LoadUserByIdPort) {}

  async getById(id: string): Promise<UserEntity | null> {
    return this.loadUserPort.loadById(id);
  }
}
