import {Login} from '../../utils/login';
import {User} from '../../utils/types/user';
import {IMyApp} from '../../app';
import {UserApi} from '../../apis/user-api';
import {TodoApi} from '../../apis/todo-api';

const app = getApp<IMyApp>();

Page({
    data: {
        userApi: <UserApi>{},
        profile: <User>{},
        todoApi: <TodoApi>{},
        roleTrans: ['', '游客', '管理员', '教师', '家长'],
    },
    onLoad() {
        this.setData({
            userApi: new UserApi(),
            todoApi: new TodoApi()
        });
    },
    onShow() {
        this.getProfile();
        this.getTodoCount();
    },
    getProfile() {
        this.data.userApi.profile().then(profile => {
            app.globalData.profile = profile;
            this.profileParse(profile);
        });
    },
    getTodoCount() {
        this.data.todoApi.getCount().then(result => {
            this.setData({
                todoCount: result.count
            });
        });
    },
    profileParse(res: User) {
        const roles = res.roles.filter(r => r !== 0).map(r => this.data.roleTrans[r]);
        if (roles.length <= 0) {
            roles.push('游客');
        }
        res.isAdmin = res.roles.indexOf(2) > -1;
        res.isTeacher = res.roles.indexOf(3) > -1;
        app.globalData.profile = res;
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res);
        }
        this.setData({
            profile: res,
            roles: roles,
            // showRegisterBtn: roles.length < 2,
            isLogin: true,
            isAdmin: res.isAdmin,
            isTeacher: res.isTeacher
        });
    },
    authSuccess() {
        Login((profile) => {
            this.profileParse(profile);
        });
    },
});
