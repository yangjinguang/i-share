// app.ts
import {User} from './utils/types/user';

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
    },
});