import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { CredentialsModel } from './credentials.model';

@Entity('profiles')
export class ProfileModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 32 })
  display_username!: string;

  @Column({ type: 'varchar', nullable: true, default: undefined })
  avatar_url?: string | undefined;

  @OneToOne(() => CredentialsModel, (credentials) => credentials.profile)
  @JoinColumn()
  credentials!: CredentialsModel;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
