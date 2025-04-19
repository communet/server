import { EntityManager, Repository } from 'typeorm';
import { ChannelMemberModel } from '@/infra/database/models/member.model';

export abstract class IChannelMembersRepository {
  abstract connectToChannel(
    profileId: string,
    channelId: string,
    manager?: EntityManager,
  ): Promise<boolean>;
}

export class ChannelMembersRepository extends IChannelMembersRepository {
  constructor(
    protected readonly membersRepository: Repository<ChannelMemberModel>,
  ) {
    super();
  }

  async connectToChannel(
    profileId: string,
    channelId: string,
    manager?: EntityManager,
  ): Promise<boolean> {
    let result = true;
    const existingMemberRow = await this.membersRepository
      .createQueryBuilder('member')
      .where('member.profile_id = :profileId', { profileId })
      .andWhere('member.channel_id = :channelId', { channelId })
      .getOne();

    if (existingMemberRow && existingMemberRow.is_connected) {
      result = false;
    } else if (existingMemberRow) {
      existingMemberRow.is_connected = true;
      await this.membersRepository.save(existingMemberRow);
    } else {
      const memberModel = {
        is_connected: true,
        profile: { id: profileId },
        channel: { id: channelId },
      };

      const repository =
        manager?.getRepository(ChannelMemberModel) ?? this.membersRepository;
      const newMember = repository.create(memberModel);
      await repository.save(newMember);
    }

    return result;
  }
}
