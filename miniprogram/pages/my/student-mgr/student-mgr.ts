import {StudentApi} from '../../../apis/student-api';
import {Student} from '../../../utils/types/student';
import {IMyApp} from '../../../app';
import {User} from '../../../utils/types/user';

const app = getApp<IMyApp>();

Page({
    data: {
        profile: <User>{},
        canMgr: false,
        classId: 0,
        className: '',
        studentApi: <StudentApi>{},
        students: <Student[]>[]
    },
    onLoad(query: any) {
        let classId = Number(query['classId']);
        let profile = app.globalData.profile;
        let canMgr = false;

        if (profile) {
            if (profile.isAdmin) {
                canMgr = true;
            } else {
                profile.classes.forEach(i => {
                    if (i.id === classId) {
                        canMgr = true;
                    }
                });
            }
        }

        this.setData({
            profile: profile,
            canMgr: canMgr,
            classId: classId,
            className: query['className'],
            studentApi: new StudentApi()
        });
        console.log(this.data.canMgr);
    },
    onShow() {
        this.getStudents();
    },
    getStudents() {
        this.data.studentApi.getByClass(this.data.classId).then(result => {
            console.log(result);
            this.setData({
                students: result
            });
        });
    },
    _studentCreate(studentId?: number) {
        let url = '/pages/my/student-mgr/create/create?classId=' + this.data.classId;
        if (studentId) {
            url = url + '&studentId=' + studentId;
        }
        wx.navigateTo({
            url: url
        });
    },
    studentCreate() {
        this._studentCreate();
    },
    studentDelete(studentId: number) {
        this.data.studentApi.delete(studentId).then(() => {
            this.getStudents();
        });
    },
    studentAction(e: any) {
        if (!this.data.canMgr) {
            return;
        }
        const studentId = e.currentTarget.dataset.studentId;
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        if (studentId) {
                            this._studentCreate(studentId);
                        }
                        break;
                    case 1:
                        if (studentId) {
                            this.studentDelete(studentId);
                        }
                        break;
                }
            }
        });
    }
});
