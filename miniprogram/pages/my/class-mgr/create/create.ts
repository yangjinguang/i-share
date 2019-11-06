import {ClassApi} from '../../../../apis/class-api';
import {Grade} from '../../../../utils/types/grade';
import {Class} from '../../../../utils/types/class';
import {IMyApp} from '../../../../app';
import {User} from '../../../../utils/types/user';

const app = getApp<IMyApp>();

Page({
    data: {
        classApi: <ClassApi>{},
        type: '',
        title: '',
        gradeId: 0,
        classId: 0,
        isNew: true,
        name: '',
        profile: <User>{}
    },
    onLoad(query: any) {
        const type = query['t'];
        const gradeId = query['gradeId'];
        const classId = query['classId'];
        let title = '';
        let isNew = true;
        if (type === 'grade') {
            isNew = !gradeId;
            title = '年级名称';
        } else {
            title = '班级名称';
            isNew = !classId;
        }
        this.setData({
            classApi: new ClassApi(),
            profile: app.globalData.profile,
            type: type || '',
            title: title,
            gradeId: gradeId || '',
            classId: classId || '',
            isNew: isNew
        });
        if (!this.data.isNew) {
            if (type === 'grade') {
                this.getGrade(this.data.gradeId);
            } else {
                this.getClass(this.data.classId);
            }
        }
    },
    getGrade(gradeId: number) {
        this.data.classApi.getGrade(gradeId).then(result => {
            this.setData({
                name: result.name
            });
        });
    },
    getClass(classId: number) {
        this.data.classApi.getClass(classId).then(result => {
            this.setData({
                name: result.name
            });
        });
    },
    formSubmit(e: any) {
        console.log(e);
        if (this.data.type === 'grade') {
            const newGrade = <Grade>{
                name: e.detail.value['name']
            };
            if (this.data.isNew) {
                console.log(newGrade);
                this.data.classApi.createGrade(newGrade).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            } else {
                this.data.classApi.updateGrade(this.data.gradeId, newGrade).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        } else {
            const newClass = <Class>{
                gradeId: this.data.gradeId,
                name: e.detail.value['name']
            };
            if (this.data.isNew) {
                this.data.classApi.createClass(newClass).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            } else {
                this.data.classApi.updateClass(this.data.classId, newClass).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
    }
});
