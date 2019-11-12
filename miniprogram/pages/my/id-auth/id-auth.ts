import {UserApi} from '../../../apis/user-api';
import {ClassApi} from '../../../apis/class-api';
import {Grade} from '../../../utils/types/grade';
import {StudentApi} from '../../../apis/student-api';
import {IdAuthOrder} from '../../../utils/types/id-auth-order';

Page({
    data: {
        userApi: <UserApi>{},
        classApi: <ClassApi>{},
        childApi: <StudentApi>{},
        rolesArr: ['家长', '教师'],
        rolesObj: [
            {
                index: 4,
                text: '家长'
            },
            {
                index: 3,
                text: '教师'
            }
        ],
        roleIndex: 0,
        classTree: <Grade[]>[],
        classArr: <string[][]>[],
        classIndex: []
    },
    onLoad() {
        this.setData!({
            userApi: new UserApi(),
            classApi: new ClassApi(),
            childApi: new StudentApi()
        });
    },
    onShow() {
        this.getClassTree();
    },
    onPullDownRefresh() {
        this.getClassTree();
    },
    getClassTree() {
        this.data.classApi.classTree().then(result => {
            const arr = [];
            arr[0] = result.map(i => i.name);
            arr[1] = result[0].classes ? result[0].classes.map(i => i.name) : [];
            this.setData!({
                classTree: result,
                classArr: arr,
            });
        });
    },

    bindRoleChange(e: any) {
        this.setData({
            roleIndex: parseInt(e.detail.value)
        });
    },
    bindClassColumnChange(e: any) {
        if (e.detail['column'] === 0) {
            const gradeIndex = parseInt(e.detail.value);
            let classTree = this.data.classTree as Array<Grade>;
            this.setData!({
                classArr: [
                    this.data.classArr[0],
                    classTree[gradeIndex].classes.map(i => i.name)
                ]
            });
        }

    },
    bindClassChange(e: any) {
        const classIndex = e.detail.value;
        this.setData!({
            classIndex: classIndex
        });
    },
    formSubmit(e: any) {
        let classTree = this.data.classTree as Array<Grade>;
        const formValue = e.detail.value;
        const orderData = <IdAuthOrder>{
            role: formValue['role'],
            studentName: formValue['studentName'],
            relation: formValue['relation']
        };
        if (formValue['class'] && formValue['class'].length > 0) {
            orderData['classId'] = classTree[formValue['class'][0]].classes[formValue['class'][1]].id;
        } else {
            return;
        }
        this.data.userApi.idAuth(orderData).then(() => {
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
