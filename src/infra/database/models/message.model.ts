import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ProfileModel } from './profile.model';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChatModel } from './chat.model';

@Entity('message')
export class MessageModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  text!: string;

  @ManyToOne(() => ProfileModel, (profile) => profile.messages)
  @JoinColumn({ name: 'author_id' })
  author!: ProfileModel;

  @ManyToOne(() => ChatModel, (chat) => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  chat!: ChatModel;

  @OneToOne(() => MessageModel, (message) => message.replies, {
    nullable: true,
  })
  @JoinColumn({ name: 'reply_to_id' })
  reply_to!: MessageModel;

  @OneToOne(() => MessageModel, (message) => message.reply_to)
  replies!: MessageModel;

  @Column({ default: false })
  is_deleted!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
