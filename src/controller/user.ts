import {
  Controller,
  Inject,
  Post,
  Del,
  Get,
  Body,
  ALL,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service/user';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { JwtService } from '@midwayjs/jwt';
import { ApiTags } from '@midwayjs/swagger';
import {
  CreateUserDto,
  DeleteUserDto,
  InfoUserDto,
  PageUserDto,
  UpdateUserDto,
} from '../dto/user';
import { IResOp } from '../interface';
import { res } from '../common/utils';
import { Validate } from '@midwayjs/validate';

@Controller('/users')
@ApiTags(['用户'])
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Post('/create')
  @Validate()
  async create(@Body(ALL) dto: CreateUserDto): Promise<IResOp> {
    const result = await this.userService.create(dto);
    if (!result) {
      return res({ code: 10001 });
    }
    return res();
  }

  @Post('/login')
  async login() {
    const { username, password } = this.ctx.request.body;
    const userInfo = await this.userService.getUserByName(username);
    if (!userInfo || !userInfo.id) {
      this.ctx.body = {
        code: 500,
        message: '账号不存在',
        data: null,
      };
      return;
    }
    if (userInfo && password != userInfo.password) {
      this.ctx.body = {
        code: 500,
        message: '账号密码错误',
        data: null,
      };
      return;
    }
    const token = await this.jwtService
      .sign({
        id: userInfo.id,
        username: userInfo.username,
      })
      .then(res => {
        return res;
      });
    this.ctx.body = {
      message: '登录成功',
      data: {
        token,
      },
    };
  }

  @Post('/update', { middleware: [AuthMiddleware] })
  @Validate()
  async update(@Body(ALL) dto: UpdateUserDto): Promise<IResOp> {
    await this.userService.update(dto);
    return res();
  }

  @Del('/{id}')
  async delete(@Query(ALL) dto: DeleteUserDto): Promise<IResOp> {
    await this.userService.delete(dto);
    return res();
  }

  @Get('/search')
  @Validate()
  async search(@Query(ALL) dto: PageUserDto): Promise<IResOp> {
    return res({
      data: await this.userService.search(dto),
    });
  }

  @Get('/info')
  @Validate()
  async info(@Query(ALL) dto: InfoUserDto): Promise<IResOp> {
    return res({
      data: await this.userService.info(dto),
    });
  }
}
