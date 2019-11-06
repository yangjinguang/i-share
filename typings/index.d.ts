/// <reference path="./types/index.d.ts" />

import {User} from '../miniprogram/utils/types/user';

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    profile?: User;
    isLogin?: boolean;
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}