import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {ItemApi} from '../../../apis/item-api';
import {Student} from '../../../utils/types/student';
import {User} from '../../../utils/types/user';
import {IMyApp} from '../../../app';
import {StudentApi} from '../../../apis/student-api';

const app = getApp<IMyApp>();

Page({
    data: {
        studentApi: <StudentApi>{},
        itemApi: <ItemApi>{},
        profile: <User>{},
        itemId: 0,
        students: <Student[]>[],
        studentsArr: <string[]>[],
        studentIndex: 0,
    },
    onLoad(query: any) {
        this.setData({
            studentApi: new StudentApi(),
            itemApi: new ItemApi(),
            profile: app.globalData.profile,
            itemId: query.id
        });
    },
    onShow() {
        this.getStudents();
    },
    getStudents() {
        this.data.studentApi.getMy().then(result => {
            this.setData({
                students: result,
                studentsArr: result.map(i => i.name)
            });
        });
        // this.data.userApi.profile().then(result => {
        //     const children = result ? result.childrenRelationsDetails.map(i => i.child) : [];
        //     this.setData({
        //         children: children,
        //         childrenArr: children.map(i => i.name)
        //     });
        // });
    },
    bindChildIndexChange(e: any) {
        this.setData({
            studentIndex: e.detail.value
        });
    },
    formSubmit() {
        const newRecord = <ItemLendOrder>{
            itemId: this.data.itemId,
            studentId: this.data.students[this.data.studentIndex].id
        };
        this.data.itemApi.lend(newRecord).then((result) => {
            console.log(result);
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
