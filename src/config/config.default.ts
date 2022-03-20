import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1647231592538_3538',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    orm: {
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'password',
      database: 'yili-music',
      synchronize: false,
      logging: false,
    },
    jwt: {
      secret: 'xxxxxxxxx',
      expiresIn: '2d',
    },
    cors: {
      credentials: false,
    },
  } as MidwayConfig;
};
