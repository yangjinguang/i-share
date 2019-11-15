import {StudentApi} from '../../../apis/student-api';
import {UserApi} from '../../../apis/user-api';
import {Student} from '../../../utils/types/student';
import {IMyApp} from '../../../app';
import {GetProfile} from '../../../utils/login';
import {User} from '../../../utils/types/user';

const app = getApp<IMyApp>();
Page({
    data: {
        studentApi: <StudentApi>{},
        userApi: <UserApi>{},
        students: <Student[]>[],
        profile: <User>{}
    },
    onLoad() {
        GetProfile(app, profile => {
            this.setData({
                studentApi: new StudentApi(),
                userApi: new UserApi(),
                profile: profile
            });
        });
        this.getStudents();
    },
    getStudents() {
        this.data.studentApi.getMy().then(result => {
            this.setData({
                students: result
            });
        });
    },
    studentAction(e: any) {
        wx.showActionSheet({
            itemList: ['移除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        if (e.currentTarget.dataset.studentId) {
                            this.removeStudent(e.currentTarget.dataset.studentId);
                        }
                        break;
                }
            }
        });
    },
    removeStudent(studentId: number) {
        wx.showModal({
            title: '确定解除绑定吗?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    this.data.userApi.unbindStudent(this.data.profile.id, studentId).then(() => {
                        this.getStudents();
                    });
                } else {
                }
            }
        });
    },
    toIdAuth() {
        wx.navigateTo({
            url: '/pages/my/id-auth/id-auth?roleIndex=0'
        });
    }
});
