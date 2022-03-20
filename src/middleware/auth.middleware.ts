import { IMiddleware, NextFunction } from '@midwayjs/core';
import { Context } from 'egg';
import { Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.request.header.authorization;
      let decode;
      if (token != 'null' && token) {
        try {
          decode = await this.jwtService.verify(token).then(res => {
            return res;
          });
          console.log(decode);
          await next();
        } catch (error) {
          console.log(error);
          ctx.status = 200;
          ctx.body = {
            message: 'token已过期，请重新登录',
            code: 401,
          };
          return;
        }
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 401,
          message: 'token不存在',
        };
        return;
      }
    };
  }
}
