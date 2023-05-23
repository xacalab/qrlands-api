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
  residencial: string;

  @Column({ type: 'varchar', default: '' })
  measures: string;

  @Column({ type: 'json', default: '[]' })
  adjoining: object[];

  @Column({ type: 'bool', default: false })
  licenseStatus: boolean;

  @Column({ type: 'bool', default: false })
  debtStatus: boolean;

  @Column({ type: 'varchar', default: '' })
  agrarianCore: string;

  @Column({ type: 'json', default: '[]' })
  observations: string[];

  @Column({ type: 'varchar', nullable: true })
  locationURL: string;

  @Column({ type: 'bool', default: false })
  isApproved: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}
