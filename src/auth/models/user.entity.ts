import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', default: '' })
  firstName: string;

  @Column({ type: 'varchar', default: '' })
  lastName: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', default: 'en-US' })
  locale: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;
}

@Entity({ name: 'users' })
export class User extends UserModel {
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  async validatePassword(password: string): Promise<boolean> {
    if (this.password) {
      return bcrypt.compare(password, this.password);
    }

    return false;
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  @BeforeInsert()
  async beforeInsert() {
    if (this.password) {
      this.password = this.hashPassword(this.password);
    }
  }
}
