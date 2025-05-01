import { EntityManager, Repository } from 'typeorm';
import { ChannelMemberModel } from '@/infra/database/models/member.model';

export abstract class IChannelMembersRepository {
  abstract checkForMember(channelId: string, userId: string): Promise<boolean>;

  abstract connectToChannel(
    profileId: string,
    channelId: string,
    manager?: EntityManager,
  ): Promise<boolean>;

  abstract disconnectFromChannel(
    profileId: string,
    channelId: string,
  ): Promise<boolean>;
}

export class ChannelMembersRepository extends IChannelMembersRepository {
  constructor(
    protected readonly membersRepository: Repository<ChannelMemberModel>,
  ) {
    super();
  }

  async checkForMember(channelId: string, profileId: string): Promise<boolean> {
    const member = await this.membersRepository.findOne({
      where: {
        channel: { id: channelId },
        profile: { id: profileId },
      },
    });
    return Boolean(member);
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

  async disconnectFromChannel(
    profileId: string,
    channelId: string,
  ): Promise<boolean> {
    let result = true;

    const existingMemberRow = await this.membersRepository
      .createQueryBuilder('member')
      .where('member.profile_id = :profileId', { profileId })
      .andWhere('member.channel_id = :channelId', { channelId })
      .getOne();

    if (existingMemberRow && existingMemberRow.is_connected) {
      existingMemberRow.is_connected = false;
      await this.membersRepository.save(existingMemberRow);
    } else {
      result = false;
    }

    return result;
  }
}
