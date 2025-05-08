import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ProfileModel } from './profile.model';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { ChannelsModel } from './channel.model';

@Entity('channel_members')
@Unique(['profile', 'channel'])
export class ChannelMemberModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ProfileModel, (profile) => profile.channels, {
    nullable: false,
  })
  @JoinColumn({ name: 'profile_id' })
  profile!: ProfileModel;

  @ManyToOne(() => ChannelsModel, (channel) => channel.members, {
    nullable: false,
  })
  @JoinColumn({ name: 'channel_id' })
  channel!: ChannelsModel;

  @Column({ default: true })
  is_connected!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at!: Date;
}
