import {ClassApi} from '../../../apis/class-api';
import {Grade} from '../../../utils/types/grade';
import {IMyApp} from '../../../app';
import {User} from '../../../utils/types/user';

const app = getApp<IMyApp>();

Page({
    data: {
        classApi: <ClassApi>{},
        gradeList: <Grade[]>[],
        profile: <User>{}
    },
    onLoad() {
        this.setData({
            classApi: new ClassApi(),
            profile: app.globalData.profile
        });
        console.log(this.data.profile);
    },
    onShow() {
        this.getGrades();
    },
    getGrades() {
        this.data.classApi.gradeList().then(result => {
            this.setData({
                gradeList: result
            });
        });
    },
    gradeCreate() {
        this.toGradeCreate();
    },
    toGradeCreate(gradeId?: string) {
        let url = '/pages/my/class-mgr/create/create?t=grade';
        if (gradeId) {
            url = url + '&gradeId=' + gradeId;
        }
        wx.navigateTo({
            url: url
        });
    },
    gradeAction(e: any) {
        const gradeId = e.currentTarget.dataset.gradeId;
        if (!gradeId) {
            return;
        }
        wx.showActionSheet({
            itemList: ['上移', '下移', '编辑', '删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        let list = this.data.gradeList.map(i => i.id);
                        let index = list.indexOf(gradeId);
                        if (index > 0) {
                            [list[index - 1], list[index]] = [list[index], list[index - 1]];
                            this.data.classApi.updateGradeOrder(list).then(() => {
                                this.getGrades();
                            });
                        }
                        break;
                    case 1:
                        let list2 = this.data.gradeList.map(i => i.id);
                        let index2 = list2.indexOf(gradeId);
                        if (index2 < list2.length - 1) {
                            [list2[index2], list2[index2 + 1]] = [list2[index2 + 1], list2[index2]];
                            this.data.classApi.updateGradeOrder(list2).then(() => {
                                this.getGrades();
                            });
                        }
                        break;
                    case 2:
                        this.toGradeCreate(gradeId);
                        break;
                    case 3:
                        this.data.classApi.deleteGrade(gradeId).then(() => {
                            this.getGrades();
                        });
                        break;
                }
            }
        });
    }
});
