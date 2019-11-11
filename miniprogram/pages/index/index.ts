// index.ts
// 获取应用实例
import {IMyApp} from '../../app';
import {User} from '../../utils/types/user';
import {GetProfile} from '../../utils/login';

const app = getApp<IMyApp>();
Page({
    data: {
        profile: <User>{}
    },
    onLoad() {
    },
    onShow() {
        GetProfile(app, (profile) => {
            this.setData({
                profile: profile
            });
            console.log(this.data.profile);
        });
    }
});
