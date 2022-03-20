import { PassportMiddleware } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Middleware } from '@midwayjs/decorator';
import * as passport from 'passport';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions():
    | Promise<passport.AuthenticateOptions>
    | passport.AuthenticateOptions {
    return {};
  }
}
