import {ClassApi} from '../../../../apis/class-api';
import {Class} from '../../../../utils/types/class';
import {IMyApp} from '../../../../app';
import {User} from '../../../../utils/types/user';

const app = getApp<IMyApp>();

Page({
    data: {
        profile: <User>{},
        classApi: <ClassApi>{},
        gradeId: 0,
        classList: <Class[]>[]
    },
    onLoad(query: any) {
        this.setData({
            profile: app.globalData.profile,
            classApi: new ClassApi(),
            gradeId: query['gradeId'],
            gradeName: query['gradeName']
        });
    },
    onShow() {
        if (this.data.gradeId) {
            this.getClassList();
        }
    },
    getClassList() {
        this.data.classApi.classListByGradeId(this.data.gradeId).then(result => {
            this.setData({
                classList: result
            });
        });
    },
    classCreate() {
        this.toCreateClass();
    },
    toCreateClass(classId?: string) {
        let url = '/pages/my/class-mgr/create/create?t=class&gradeId=' + this.data.gradeId;
        if (classId) {
            url = url + '&classId=' + classId;
        }
        wx.navigateTo({
            url: url
        });
    },
    classAction(e: any) {
        const classId = e.currentTarget.dataset.classId;
        if (!classId) {
            return;
        }
        wx.showActionSheet({
            itemList: ['上移', '下移', '编辑', '删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        let list = this.data.classList.map(i => i.id);
                        let index = list.indexOf(classId);
                        if (index > 0) {
                            [list[index - 1], list[index]] = [list[index], list[index - 1]];
                            this.data.classApi.updateClassOrder(list).then(() => {
                                this.getClassList();
                            });
                        }
                        break;
                    case 1:
                        let list2 = this.data.classList.map(i => i.id);
                        let index2 = list2.indexOf(classId);
                        if (index2 < list2.length - 1) {
                            [list2[index2], list2[index2 + 1]] = [list2[index2 + 1], list2[index2]];
                            this.data.classApi.updateClassOrder(list2).then(() => {
                                this.getClassList();
                            });
                        }
                        break;
                    case 2:
                        this.toCreateClass(classId);
                        break;
                    case 3:
                        this.data.classApi.delete(classId).then(() => {
                            this.getClassList();
                        });
                        break;
                }
            }
        });
    }

});
