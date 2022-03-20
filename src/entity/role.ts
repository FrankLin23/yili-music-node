import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from './base';

@EntityModel('role')
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  title: string;
}
