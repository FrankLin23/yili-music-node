import { EntityModel } from '@midwayjs/orm';
import { Role } from './role';
import { Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base';

export enum Gender {
  FEMALE,
  MALE,
  UNKNOWN,
}

@EntityModel('user')
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @ManyToMany(type => Role)
  roles: Role[];

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  locked: boolean;

  @Column()
  enabled: boolean;

  @Column()
  last_login_ip: string;

  @Column()
  last_login_time: Date;
}
