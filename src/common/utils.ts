import { IResOp } from '../interface';
import Error_constants from './error_constants';
import { Config, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@midwayjs/jwt';

export function res(op?: IResOp): IResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? getErrorMessageByCode(op!.code) || op?.message || 'unknown error'
      : op?.message || 'success',
  };
}

export function getErrorMessageByCode(code: number): string {
  return Error_constants[code];
}

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Inject()
  jwtService: JwtService;

  @Config('jwt')
  jwt;

  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  async jwtSign(sign: any): Promise<string> {
    console.log(sign);
    return await this.jwtService.sign(sign);
  }
}
