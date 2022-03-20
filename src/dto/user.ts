import { Gender } from '../entity/user';
import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @Rule(RuleType.string().min(4).max(64).required())
  username: string;

  @ApiProperty({ description: '密码' })
  @Rule(RuleType.string().min(6).max(64).required())
  password: string;

  @ApiProperty({ description: '昵称' })
  @Rule(RuleType.string().empty('').optional())
  nickname: string;

  @ApiProperty({ description: '性别' })
  gender: Gender;
}

@Rule(CreateUserDto)
export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ description: '需要更新的id' })
  @Rule(RuleType.string().required())
  id: string;
}

export class InfoUserDto {
  @ApiProperty({ description: 'id' })
  @Rule(RuleType.string().required())
  id: string;
}

export class PageUserDto {
  @ApiProperty({ description: '分页查询每页的数量', example: 10 })
  @Rule(RuleType.number().integer().min(0).default(10))
  limit: number;

  @ApiProperty({ description: '分页查询当前的页数', example: 1 })
  @Rule(RuleType.number().integer().min(1).default(1))
  page: number;
}

export class DeleteUserDto {
  @ApiProperty({ description: '需要删除的id' })
  @Rule(RuleType.string().required())
  id: string;
}
