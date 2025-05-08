import { Provider } from '@nestjs/common';
import { IChatsRepository } from '@/infra/database/repositories/chats.repositories';
import { IChannelMembersRepository } from '@/infra/database/repositories/members.repositories';
import { IChannelsRepository } from '@/infra/database/repositories/channels.repositories';
import { IMessageMixin, MessageMixin } from '@/logic/mixin/message.mixin';
import { ChatMixin, IChatMixin } from '@/logic/mixin/chat.mixin';
import { IMemberMixin, MemberMixin } from '@/logic/mixin/member.mixin';

export const MessageMixinProvider: Provider = {
  provide: IMessageMixin,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
    chatsRepository: IChatsRepository,
  ) => {
    return new MessageMixin(
      channelsRepository,
      membersRepository,
      chatsRepository,
    );
  },
  inject: [IChannelsRepository, IChannelMembersRepository, IChatsRepository],
};

export const ChatMixinProvider: Provider = {
  provide: IChatMixin,
  useFactory: (
    channelsRepository: IChannelsRepository,
    membersRepository: IChannelMembersRepository,
  ) => {
    return new ChatMixin(channelsRepository, membersRepository);
  },
  inject: [IChannelsRepository, IChannelMembersRepository],
};

export const MemberMixinProvider: Provider = {
  provide: IMemberMixin,
  useFactory: (channelRepository: IChannelsRepository) => {
    return new MemberMixin(channelRepository);
  },
  inject: [IChannelsRepository],
};
