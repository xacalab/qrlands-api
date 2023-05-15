import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'lands' })
export class Land {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  folio: string;

  @Column({ type: 'varchar', default: '' })
  owner: string;

  @Column({ type: 'json', default: '[]' })
  adjoining: object[];

  @Column({ type: 'varchar', nullable: true })
  locationURL: string;

  @Column({ type: 'json', default: '[]' })
  observations: string[];

  @Column({ type: 'bool', default: false })
  isApproved: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
