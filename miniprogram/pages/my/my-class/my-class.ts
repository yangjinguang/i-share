import {ClassApi} from '../../../apis/class-api';
import {Class} from '../../../utils/types/class';
import {User} from '../../../utils/types/user';
import {IMyApp} from '../../../app';
import {GetProfile} from '../../../utils/login';
import {UserApi} from '../../../apis/user-api';

const app = getApp<IMyApp>();
Page({
    data: {
        classApi: <ClassApi>{},
        classList: <Class[]>[],
        userApi: <UserApi>{},
        profile: <User>{}
    },
    onLoad() {
        GetProfile(app, profile => {
            this.setData({
                classApi: new ClassApi(),
                userApi: new UserApi(),
                profile: profile
            });
        });

        this.getClass();
    },
    getClass() {
        this.data.classApi.getMyClass().then((result) => {
            this.setData({
                classList: result
            });
        });
    },
    classAction(e: any) {
        wx.showActionSheet({
            itemList: ['退出'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        if (e.currentTarget.dataset.classId) {
                            this.quitClass(e.currentTarget.dataset.classId);
                        }
                        break;
                }
            }
        });
    },
    quitClass(classId: number) {
        wx.showModal({
            title: '确定要退出此班级吗?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    this.data.userApi.unbindClass(this.data.profile.id, classId).then(() => {
                        this.getClass();
                    });
                } else {
                }
            }
        });
    },
    toIdAuth() {
        wx.navigateTo({
            url: '/pages/my/id-auth/id-auth?roleIndex=1'
        });
    }
});
