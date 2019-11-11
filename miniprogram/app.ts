// app.ts
import {User} from './utils/types/user';
import {UserApi} from './apis/user-api';

export interface IMyApp {
    userInfoReadyCallback?(res: any): void

    profileReadyCallback?(res?: User): void

    globalData: {
        profile?: User;
        isLogin?: boolean;
    }
}


App<IMyApp>({
    globalData: {},
    onLaunch() {
        wx.checkSession({
            success: () => {
                //session_key 未过期，并且在本生命周期一直有效
                if (!this.globalData.isLogin) {
                    let userApi = new UserApi();
                    userApi.profile().then(profile => {
                        profile.isAdmin = profile.roles.indexOf(2) > -1;
                        profile.isTeacher = profile.roles.indexOf(3) > -1;
                        this.globalData.isLogin = true;
                        this.globalData.profile = profile;
                        if (this.profileReadyCallback) {
                            this.profileReadyCallback(profile);
                        }
                    }).catch(() => {
                        wx.removeStorageSync('accessToken');
                        wx.switchTab({
                            url: '/pages/my/my'
                        });
                    });
                }
            },
            fail: () => {
                // session_key 已经失效，需要重新执行登录流程
                wx.removeStorageSync('accessToken');
                wx.switchTab({
                    url: '/pages/my/my'
                });
            }
        });
    },
});
