// import GetUserInfoSuccessCallbackResult = wx.GetUserInfoSuccessCallbackResult;
import {AuthApi, AuthPostData} from '../apis/auth-api';
import {User} from './types/user';
import {IMyApp} from '../app';

export function Login(cb: (profile: User) => void) {
    const authApi = new AuthApi();
    // 登录
    wx.login({
        success: (_res) => {
            // 获取用户信息
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                authApi.auth(<AuthPostData>{
                                    code: _res.code,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                    rawData: res.rawData,
                                    signature: res.signature
                                }).then((authRes => {
                                    try {
                                        wx.setStorageSync('accessToken', authRes.data.accessToken);
                                    } catch (e) {
                                    }
                                    cb(authRes.data.profile);
                                }));
                            }
                        });
                    }
                }
            });
        },
        fail: (_err) => {
            console.log(_err);
        }
    });
}

export function GetProfile(app: IMyApp, cb: (profile?: User) => void) {
    if (!app.globalData.isLogin) {
        app.profileReadyCallback = res => {
            cb(res);
        };
    } else {
        cb(app.globalData.profile);
    }
}
