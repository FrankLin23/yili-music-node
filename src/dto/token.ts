import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';

export class CreateTokenDto {
  @ApiProperty({ description: '用户名' })
  @Rule(RuleType.string().min(4).max(64).required())
  username: string;

  @ApiProperty({ description: '密码' })
  @Rule(RuleType.string().min(6).max(64).required())
  password: string;
}
