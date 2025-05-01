import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChannelMemberModel } from './member.model';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChatModel } from './chat.model';

@Entity('channel')
export class ChannelsModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32 })
  name!: string;

  @Column({ type: 'text', nullable: true, default: undefined })
  description?: string | undefined;

  @Column({ type: 'varchar', nullable: true, default: undefined })
  avatar_url?: string | undefined;

  @Column({ default: false })
  is_deleted!: boolean;

  @OneToMany(() => ChatModel, (chat) => chat.channel)
  chats!: ChatModel[];

  @OneToMany(() => ChannelMemberModel, (member) => member.channel, {
    eager: false,
  })
  members!: ChannelMemberModel[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
