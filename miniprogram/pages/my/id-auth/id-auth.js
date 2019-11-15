"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_api_1 = require("../../../apis/user-api");
var class_api_1 = require("../../../apis/class-api");
var student_api_1 = require("../../../apis/student-api");
Page({
    data: {
        userApi: {},
        classApi: {},
        childApi: {},
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
        classTree: [],
        classArr: [],
        classIndex: []
    },
    onLoad: function (q) {
        this.setData({
            userApi: new user_api_1.UserApi(),
            classApi: new class_api_1.ClassApi(),
            childApi: new student_api_1.StudentApi(),
            roleIndex: q['roleIndex'] ? Number(q['roleIndex']) : 0
        });
    },
    onShow: function () {
        this.getClassTree();
    },
    onPullDownRefresh: function () {
        this.getClassTree();
    },
    getClassTree: function () {
        var _this = this;
        this.data.classApi.classTree().then(function (result) {
            var arr = [];
            arr[0] = result.map(function (i) { return i.name; });
            arr[1] = result[0].classes ? result[0].classes.map(function (i) { return i.name; }) : [];
            _this.setData({
                classTree: result,
                classArr: arr,
            });
        });
    },
    bindRoleChange: function (e) {
        this.setData({
            roleIndex: parseInt(e.detail.value)
        });
    },
    bindClassColumnChange: function (e) {
        if (e.detail['column'] === 0) {
            var gradeIndex = parseInt(e.detail.value);
            var classTree = this.data.classTree;
            this.setData({
                classArr: [
                    this.data.classArr[0],
                    classTree[gradeIndex].classes.map(function (i) { return i.name; })
                ]
            });
        }
    },
    bindClassChange: function (e) {
        var classIndex = e.detail.value;
        this.setData({
            classIndex: classIndex
        });
    },
    formSubmit: function (e) {
        var classTree = this.data.classTree;
        var formValue = e.detail.value;
        var orderData = {
            role: formValue['role'],
            studentName: formValue['studentName'],
            relation: formValue['relation']
        };
        if (formValue['class'] && formValue['class'].length > 0) {
            orderData['classId'] = classTree[formValue['class'][0]].classes[formValue['class'][1]].id;
        }
        else {
            return;
        }
        this.data.userApi.idAuth(orderData).then(function () {
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkLWF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0M7QUFDL0MscURBQWlEO0FBRWpELHlEQUFxRDtBQUdyRCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVcsRUFBRTtRQUNwQixRQUFRLEVBQVksRUFBRTtRQUN0QixRQUFRLEVBQWMsRUFBRTtRQUN4QixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsRUFBRTtZQUNOO2dCQUNJLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0o7UUFDRCxTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBVyxFQUFFO1FBQ3RCLFFBQVEsRUFBYyxFQUFFO1FBQ3hCLFVBQVUsRUFBRSxFQUFFO0tBQ2pCO0lBQ0QsTUFBTSxZQUFDLENBQU07UUFDVCxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1YsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtZQUN0QixRQUFRLEVBQUUsSUFBSSxvQkFBUSxFQUFFO1lBQ3hCLFFBQVEsRUFBRSxJQUFJLHdCQUFVLEVBQUU7WUFDMUIsU0FBUyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pELENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELFlBQVk7UUFBWixpQkFVQztRQVRHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDdEMsSUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRSxLQUFJLENBQUMsT0FBUSxDQUFDO2dCQUNWLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixRQUFRLEVBQUUsR0FBRzthQUNoQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxjQUFjLFlBQUMsQ0FBTTtRQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QscUJBQXFCLFlBQUMsQ0FBTTtRQUN4QixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBeUIsQ0FBQztZQUNwRCxJQUFJLENBQUMsT0FBUSxDQUFDO2dCQUNWLFFBQVEsRUFBRTtvQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUM7aUJBQ2pEO2FBQ0osQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0lBQ0QsZUFBZSxZQUFDLENBQU07UUFDbEIsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNWLFVBQVUsRUFBRSxVQUFVO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxVQUFVLFlBQUMsQ0FBTTtRQUNiLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBeUIsQ0FBQztRQUNwRCxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFNLFNBQVMsR0FBZ0I7WUFDM0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdkIsV0FBVyxFQUFFLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFDckMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUM7U0FDbEMsQ0FBQztRQUNGLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUM3RjthQUFNO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNaLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVc2VyQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL3VzZXItYXBpJztcbmltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7U3R1ZGVudEFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9zdHVkZW50LWFwaSc7XG5pbXBvcnQge0lkQXV0aE9yZGVyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pZC1hdXRoLW9yZGVyJztcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICB1c2VyQXBpOiA8VXNlckFwaT57fSxcbiAgICAgICAgY2xhc3NBcGk6IDxDbGFzc0FwaT57fSxcbiAgICAgICAgY2hpbGRBcGk6IDxTdHVkZW50QXBpPnt9LFxuICAgICAgICByb2xlc0FycjogWyflrrbplb8nLCAn5pWZ5biIJ10sXG4gICAgICAgIHJvbGVzT2JqOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDQsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WutumVvydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDMsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aVmeW4iCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcm9sZUluZGV4OiAwLFxuICAgICAgICBjbGFzc1RyZWU6IDxHcmFkZVtdPltdLFxuICAgICAgICBjbGFzc0FycjogPHN0cmluZ1tdW10+W10sXG4gICAgICAgIGNsYXNzSW5kZXg6IFtdXG4gICAgfSxcbiAgICBvbkxvYWQocTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgdXNlckFwaTogbmV3IFVzZXJBcGkoKSxcbiAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKSxcbiAgICAgICAgICAgIGNoaWxkQXBpOiBuZXcgU3R1ZGVudEFwaSgpLFxuICAgICAgICAgICAgcm9sZUluZGV4OiBxWydyb2xlSW5kZXgnXSA/IE51bWJlcihxWydyb2xlSW5kZXgnXSkgOiAwXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldENsYXNzVHJlZSgpO1xuICAgIH0sXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NUcmVlKCk7XG4gICAgfSxcbiAgICBnZXRDbGFzc1RyZWUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS5jbGFzc1RyZWUoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIGFyclswXSA9IHJlc3VsdC5tYXAoaSA9PiBpLm5hbWUpO1xuICAgICAgICAgICAgYXJyWzFdID0gcmVzdWx0WzBdLmNsYXNzZXMgPyByZXN1bHRbMF0uY2xhc3Nlcy5tYXAoaSA9PiBpLm5hbWUpIDogW107XG4gICAgICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgICAgICBjbGFzc1RyZWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBjbGFzc0FycjogYXJyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBiaW5kUm9sZUNoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHJvbGVJbmRleDogcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZENsYXNzQ29sdW1uQ2hhbmdlKGU6IGFueSkge1xuICAgICAgICBpZiAoZS5kZXRhaWxbJ2NvbHVtbiddID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBncmFkZUluZGV4ID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUpO1xuICAgICAgICAgICAgbGV0IGNsYXNzVHJlZSA9IHRoaXMuZGF0YS5jbGFzc1RyZWUgYXMgQXJyYXk8R3JhZGU+O1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICAgICAgY2xhc3NBcnI6IFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmNsYXNzQXJyWzBdLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc1RyZWVbZ3JhZGVJbmRleF0uY2xhc3Nlcy5tYXAoaSA9PiBpLm5hbWUpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH0sXG4gICAgYmluZENsYXNzQ2hhbmdlKGU6IGFueSkge1xuICAgICAgICBjb25zdCBjbGFzc0luZGV4ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgY2xhc3NJbmRleDogY2xhc3NJbmRleFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1TdWJtaXQoZTogYW55KSB7XG4gICAgICAgIGxldCBjbGFzc1RyZWUgPSB0aGlzLmRhdGEuY2xhc3NUcmVlIGFzIEFycmF5PEdyYWRlPjtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIGNvbnN0IG9yZGVyRGF0YSA9IDxJZEF1dGhPcmRlcj57XG4gICAgICAgICAgICByb2xlOiBmb3JtVmFsdWVbJ3JvbGUnXSxcbiAgICAgICAgICAgIHN0dWRlbnROYW1lOiBmb3JtVmFsdWVbJ3N0dWRlbnROYW1lJ10sXG4gICAgICAgICAgICByZWxhdGlvbjogZm9ybVZhbHVlWydyZWxhdGlvbiddXG4gICAgICAgIH07XG4gICAgICAgIGlmIChmb3JtVmFsdWVbJ2NsYXNzJ10gJiYgZm9ybVZhbHVlWydjbGFzcyddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG9yZGVyRGF0YVsnY2xhc3NJZCddID0gY2xhc3NUcmVlW2Zvcm1WYWx1ZVsnY2xhc3MnXVswXV0uY2xhc3Nlc1tmb3JtVmFsdWVbJ2NsYXNzJ11bMV1dLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS51c2VyQXBpLmlkQXV0aChvcmRlckRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19