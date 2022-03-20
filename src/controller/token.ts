import {
  ALL,
  Body,
  Controller,
  Headers,
  Inject,
  Post,
} from '@midwayjs/decorator';
import { UserService } from '../service/user';
import { CreateTokenDto } from '../dto/token';
import { IResOp } from '../interface';
import { res } from '../common/utils';
import { Validate } from '@midwayjs/validate';
import { ApiTags } from '@midwayjs/swagger';

@Controller('/tokens')
@ApiTags(['Token'])
export class TokenController {
  @Inject()
  userService: UserService;

  @Post()
  @Validate()
  async create(@Body(ALL) dto: CreateTokenDto): Promise<IResOp> {
    const result = await this.userService.createToken(dto);
    return res({
      data: result,
    });
  }

  @Post('/mp')
  async createByMp(@Headers('X-WX-OPENID') openId: string) {}
}
