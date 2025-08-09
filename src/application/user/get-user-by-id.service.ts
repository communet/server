import { UserEntity } from '../../core/entities';
import { LoadUserByIdPort } from '../../core/ports';

export class GetUserByIdService {
  constructor(private readonly loadUserPort: LoadUserByIdPort) {}

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.loadUserPort.loadById(id);
  }
}
