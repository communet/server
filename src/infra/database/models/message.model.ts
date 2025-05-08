import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => ProfileModel, (profile) => profile.messages, {
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author!: ProfileModel;

  @ManyToOne(() => ChatModel, (chat) => chat.messages, {
    nullable: false,
  })
  @JoinColumn({ name: 'chat_id' })
  chat!: ChatModel;

  @Column({ type: 'text', nullable: true, default: undefined })
  reply_to?: string | undefined;

  @Column({ default: false })
  is_deleted!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
