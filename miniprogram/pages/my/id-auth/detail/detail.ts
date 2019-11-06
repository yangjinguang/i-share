import {UserApi} from '../../../../apis/user-api';
import {IdAuthOrder} from '../../../../utils/types/id-auth-order';
import {UserIdAuthHandleData} from '../../../../utils/types/user-id-auth-handle-data';
import {StudentApi} from '../../../../apis/student-api';
import {Student} from '../../../../utils/types/student';

Page({
    data: {
        userApi: <UserApi>{},
        studentApi: <StudentApi>{},
        idAuthOrder: <IdAuthOrder>{},
        students: <Student[]>[],
        studentsArr: <string[]>[],
        studentIndex: 0,
        orderId: 0,
        isAgree: true,
        role: 0
    },
    onLoad(query: any) {
        this.setData!({
            userApi: new UserApi(),
            studentApi: new StudentApi(),
            orderId: Number(query['orderId'])
        });
    },
    onShow() {
        this.getOrderDetail();
    },
    getOrderDetail() {
        if (this.data.orderId) {
            this.data.userApi.getIdAuthDetail(this.data.orderId).then(result => {
                this.setData!({
                    idAuthOrder: result,
                    role: result.role
                });
                if (this.data.role === 4) {
                    this.getStudents(result.classId);
                }
            });
        }
    },
    getStudents(classId: number) {
        this.data.studentApi.getByClass(classId).then(result => {
            this.setData!({
                students: result,
                studentsArr: result ? result.map(i => i.name) : <string[]>[]
            });
        });
    },
    studentSelectChange(e: any) {
        this.setData!({
            studentIndex: e.detail.value
        });
    },
    agreeChange(e: any) {
        this.setData!({
            isAgree: e.detail.value == 'true'
        });
        console.log(this.data);
    },
    formSubmit(e: any) {

        const postData = <UserIdAuthHandleData>{
            orderId: this.data.orderId,
            agree: this.data.isAgree,
            rejectMsg: e.detail.value['rejectMsg']
        };
        if (this.data.role === 4) {
            if (this.data.students && this.data.students[this.data.studentIndex]) {
                postData['studentId'] = this.data.students[this.data.studentIndex].id;
            } else {
                wx.showModal({
                    title: '',
                    content: '必须选择一个孩子',
                    showCancel: false,
                    success: () => {

                    }
                });
                return;
            }
        }
        this.data.userApi.idAuthHandle(postData).then(() => {
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
