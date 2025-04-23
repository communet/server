import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChannelsModel } from './channel.model';

export enum ChatType {
  TEXT = 'text',
  VOICE = 'voice',
}

@Entity('chat')
export class ChatModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.TEXT,
  })
  type!: ChatType;

  @ManyToOne(() => ChannelsModel, (channel) => channel.chats)
  @JoinColumn({ name: 'channel_id' })
  channel!: ChannelsModel;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
