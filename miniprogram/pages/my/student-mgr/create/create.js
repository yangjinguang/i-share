"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var student_api_1 = require("../../../../apis/student-api");
Page({
    data: {
        studentApi: {},
        studentId: 0,
        classId: 0,
        isNew: true,
        name: ''
    },
    onLoad: function (query) {
        console.log(query);
        this.setData({
            studentApi: new student_api_1.StudentApi(),
            studentId: query['studentId'] || '',
            isNew: !query['studentId'],
            classId: query['classId']
        });
        this.getChild();
    },
    getChild: function () {
        var _this = this;
        if (this.data.studentId) {
            this.data.studentApi.get(this.data.studentId).then(function (result) {
                _this.setData({
                    name: result.name
                });
            });
        }
    },
    formSubmit: function (e) {
        var formValue = e.detail.value;
        var newStudent = {
            classId: this.data.classId,
            name: formValue['name']
        };
        if (this.data.isNew) {
            this.data.studentApi.create(newStudent).then(function () {
                wx.navigateBack({
                    delta: 1
                });
            });
        }
        else {
            this.data.studentApi.update(this.data.studentId, newStudent).then(function () {
                wx.navigateBack({
                    delta: 1
                });
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQXdEO0FBR3hELElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFVBQVUsRUFBYyxFQUFFO1FBQzFCLFNBQVMsRUFBRSxDQUFDO1FBQ1osT0FBTyxFQUFFLENBQUM7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxFQUFFO0tBQ1g7SUFDRCxNQUFNLEVBQU4sVUFBTyxLQUFVO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsVUFBVSxFQUFFLElBQUksd0JBQVUsRUFBRTtZQUM1QixTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDbkMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUMxQixPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUM1QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELFFBQVE7UUFBUixpQkFRQztRQVBHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDckQsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7aUJBQ3BCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBQ0QsVUFBVSxFQUFWLFVBQVcsQ0FBTTtRQUNiLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQU0sVUFBVSxHQUFZO1lBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDMUIsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUM7U0FDMUIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDekMsRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDWixLQUFLLEVBQUUsQ0FBQztpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM5RCxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUNaLEtBQUssRUFBRSxDQUFDO2lCQUNYLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHVkZW50QXBpfSBmcm9tICcuLi8uLi8uLi8uLi9hcGlzL3N0dWRlbnQtYXBpJztcbmltcG9ydCB7U3R1ZGVudH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvdHlwZXMvc3R1ZGVudCc7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgc3R1ZGVudEFwaTogPFN0dWRlbnRBcGk+e30sXG4gICAgICAgIHN0dWRlbnRJZDogMCxcbiAgICAgICAgY2xhc3NJZDogMCxcbiAgICAgICAgaXNOZXc6IHRydWUsXG4gICAgICAgIG5hbWU6ICcnXG4gICAgfSxcbiAgICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhxdWVyeSk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzdHVkZW50QXBpOiBuZXcgU3R1ZGVudEFwaSgpLFxuICAgICAgICAgICAgc3R1ZGVudElkOiBxdWVyeVsnc3R1ZGVudElkJ10gfHwgJycsXG4gICAgICAgICAgICBpc05ldzogIXF1ZXJ5WydzdHVkZW50SWQnXSxcbiAgICAgICAgICAgIGNsYXNzSWQ6IHF1ZXJ5WydjbGFzc0lkJ11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGQoKTtcbiAgICB9LFxuICAgIGdldENoaWxkKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnN0dWRlbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnN0dWRlbnRBcGkuZ2V0KHRoaXMuZGF0YS5zdHVkZW50SWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXN1bHQubmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGZvcm1TdWJtaXQoZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdTdHVkZW50ID0gPFN0dWRlbnQ+e1xuICAgICAgICAgICAgY2xhc3NJZDogdGhpcy5kYXRhLmNsYXNzSWQsXG4gICAgICAgICAgICBuYW1lOiBmb3JtVmFsdWVbJ25hbWUnXVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5kYXRhLmlzTmV3KSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc3R1ZGVudEFwaS5jcmVhdGUobmV3U3R1ZGVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnN0dWRlbnRBcGkudXBkYXRlKHRoaXMuZGF0YS5zdHVkZW50SWQsIG5ld1N0dWRlbnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufSk7XG4iXX0=