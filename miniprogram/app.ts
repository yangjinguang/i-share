// app.ts
import {User} from './utils/types/user';
import {CheckLoginStatus, GetProfile} from './utils/login';

export interface IMyApp {
    userInfoReadyCallback?(res: User): void

    globalData: {
        profile?: User;
        isLogin?: boolean;
    }
}


App<IMyApp>({
    globalData: {},
    onLaunch() {
        CheckLoginStatus(() => {
            GetProfile(this, () => {
            });
        });
    },
});
