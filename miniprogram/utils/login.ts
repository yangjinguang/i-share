// import GetUserInfoSuccessCallbackResult = wx.GetUserInfoSuccessCallbackResult;
import {AuthApi, AuthPostData} from '../apis/auth-api';
import {User} from './types/user';
import GetUserInfoSuccessCallbackResult = WechatMiniprogram.GetUserInfoSuccessCallbackResult;

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

export function CheckLoginStatus(successCb: (res: GetUserInfoSuccessCallbackResult) => void, failCb?: () => void) {
    console.log(111);
    const clearLoginStatus = () => {
        wx.removeStorageSync('accessToken');
        wx.switchTab({
            url: '/pages/my/my'
        });
    };
    const token = wx.getStorageSync('accessToken');
    if (!token) {
        clearLoginStatus();
        return;
    }

    wx.checkSession({
        success: () => {
            wx.getSetting({
                success: (res) => {
                    console.log(res);
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: res => {
                                successCb(res);
                            }
                        });
                    } else {
                        failCb && failCb();
                        clearLoginStatus();
                    }
                },
                fail: () => {
                    failCb && failCb();
                    clearLoginStatus();
                }
            });
        },
        fail: () => {
            failCb && failCb();
            clearLoginStatus();
        }
    });
    // }
}