import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { CredentialsModel } from './credentials.model';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChannelMemberModel } from './member.model';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { MessageModel } from './message.model';

@Entity('profiles')
export class ProfileModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32 })
  display_username!: string;

  @Column({ type: 'varchar', nullable: true, default: undefined })
  avatar_url?: string | undefined;

  @OneToOne(() => CredentialsModel, (credentials) => credentials.profile, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  credentials!: CredentialsModel;

  @OneToMany(() => ChannelMemberModel, (member) => member.profile)
  channels!: ChannelMemberModel[];

  @OneToMany(() => MessageModel, (message) => message.chat)
  messages!: MessageModel[];

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
