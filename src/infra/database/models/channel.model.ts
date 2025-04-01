import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
}
