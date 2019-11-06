import {StudentApi} from '../../../../apis/student-api';
import {Student} from '../../../../utils/types/student';

Page({
    data: {
        studentApi: <StudentApi>{},
        studentId: 0,
        classId: 0,
        isNew: true,
        name: ''
    },
    onLoad(query: any) {
        console.log(query);
        this.setData({
            studentApi: new StudentApi(),
            studentId: query['studentId'] || '',
            isNew: !query['studentId'],
            classId: query['classId']
        });
        this.getChild();
    },
    getChild() {
        if (this.data.studentId) {
            this.data.studentApi.get(this.data.studentId).then(result => {
                this.setData({
                    name: result.name
                });
            });
        }
    },
    formSubmit(e: any) {
        const formValue = e.detail.value;
        const newStudent = <Student>{
            classId: this.data.classId,
            name: formValue['name']
        };
        if (this.data.isNew) {
            this.data.studentApi.create(newStudent).then(() => {
                wx.navigateBack({
                    delta: 1
                });
            });
        } else {
            this.data.studentApi.update(this.data.studentId, newStudent).then(() => {
                wx.navigateBack({
                    delta: 1
                });
            });
        }

    }
});
