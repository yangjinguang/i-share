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
    onLoad: function () {
        this.setData({
            userApi: new user_api_1.UserApi(),
            classApi: new class_api_1.ClassApi(),
            childApi: new student_api_1.StudentApi()
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
        console.info(orderData);
        this.data.userApi.idAuth(orderData).then(function () {
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQtYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkLWF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0M7QUFDL0MscURBQWlEO0FBRWpELHlEQUFxRDtBQUdyRCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVcsRUFBRTtRQUNwQixRQUFRLEVBQVksRUFBRTtRQUN0QixRQUFRLEVBQWMsRUFBRTtRQUN4QixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsRUFBRTtZQUNOO2dCQUNJLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0o7UUFDRCxTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBVyxFQUFFO1FBQ3RCLFFBQVEsRUFBYyxFQUFFO1FBQ3hCLFVBQVUsRUFBRSxFQUFFO0tBQ2pCO0lBQ0QsTUFBTSxFQUFOO1FBQ0ksSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNWLE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7WUFDdEIsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtZQUN4QixRQUFRLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELFlBQVksRUFBWjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUN0QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZixHQUFHLENBQUMsQ0FBQyxDQUFD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O1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFPUCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVc2VyQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL3VzZXItYXBpJztcbmltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7U3R1ZGVudEFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9zdHVkZW50LWFwaSc7XG5pbXBvcnQge0lkQXV0aE9yZGVyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pZC1hdXRoLW9yZGVyJztcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICB1c2VyQXBpOiA8VXNlckFwaT57fSxcbiAgICAgICAgY2xhc3NBcGk6IDxDbGFzc0FwaT57fSxcbiAgICAgICAgY2hpbGRBcGk6IDxTdHVkZW50QXBpPnt9LFxuICAgICAgICByb2xlc0FycjogWyflrrbplb8nLCAn5pWZ5biIJ10sXG4gICAgICAgIHJvbGVzT2JqOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDQsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WutumVvydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDMsXG4gICAgICAgICAgICAgICAgdGV4dDogJ+aVmeW4iCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgcm9sZUluZGV4OiAwLFxuICAgICAgICBjbGFzc1RyZWU6IDxHcmFkZVtdPltdLFxuICAgICAgICBjbGFzc0FycjogPHN0cmluZ1tdW10+W10sXG4gICAgICAgIGNsYXNzSW5kZXg6IFtdXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgdXNlckFwaTogbmV3IFVzZXJBcGkoKSxcbiAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKSxcbiAgICAgICAgICAgIGNoaWxkQXBpOiBuZXcgU3R1ZGVudEFwaSgpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldENsYXNzVHJlZSgpO1xuICAgIH0sXG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NUcmVlKCk7XG4gICAgfSxcbiAgICBnZXRDbGFzc1RyZWUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS5jbGFzc1RyZWUoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgIGFyclswXSA9IHJlc3VsdC5tYXAoaSA9PiBpLm5hbWUpO1xuICAgICAgICAgICAgYXJyWzFdID0gcmVzdWx0WzBdLmNsYXNzZXMgPyByZXN1bHRbMF0uY2xhc3Nlcy5tYXAoaSA9PiBpLm5hbWUpIDogW107XG4gICAgICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgICAgICBjbGFzc1RyZWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBjbGFzc0FycjogYXJyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBiaW5kUm9sZUNoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICByb2xlSW5kZXg6IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGJpbmRDbGFzc0NvbHVtbkNoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgaWYgKGUuZGV0YWlsWydjb2x1bW4nXSA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgZ3JhZGVJbmRleCA9IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlKTtcbiAgICAgICAgICAgIGxldCBjbGFzc1RyZWUgPSB0aGlzLmRhdGEuY2xhc3NUcmVlIGFzIEFycmF5PEdyYWRlPjtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgIGNsYXNzQXJyOiBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jbGFzc0FyclswXSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NUcmVlW2dyYWRlSW5kZXhdLmNsYXNzZXMubWFwKGkgPT4gaS5uYW1lKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIGJpbmRDbGFzc0NoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgY2xhc3NJbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIGNsYXNzSW5kZXg6IGNsYXNzSW5kZXhcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JtU3VibWl0KGU6IGFueSkge1xuICAgICAgICBsZXQgY2xhc3NUcmVlID0gdGhpcy5kYXRhLmNsYXNzVHJlZSBhcyBBcnJheTxHcmFkZT47XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICBjb25zdCBvcmRlckRhdGEgPSA8SWRBdXRoT3JkZXI+e1xuICAgICAgICAgICAgcm9sZTogZm9ybVZhbHVlWydyb2xlJ10sXG4gICAgICAgICAgICBzdHVkZW50TmFtZTogZm9ybVZhbHVlWydzdHVkZW50TmFtZSddLFxuICAgICAgICAgICAgcmVsYXRpb246IGZvcm1WYWx1ZVsncmVsYXRpb24nXVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZm9ybVZhbHVlWydjbGFzcyddICYmIGZvcm1WYWx1ZVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckRhdGFbJ2NsYXNzSWQnXSA9IGNsYXNzVHJlZVtmb3JtVmFsdWVbJ2NsYXNzJ11bMF1dLmNsYXNzZXNbZm9ybVZhbHVlWydjbGFzcyddWzFdXS5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE8gZXJyIGhhbmRsZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuaW5mbyhvcmRlckRhdGEpO1xuICAgICAgICB0aGlzLmRhdGEudXNlckFwaS5pZEF1dGgob3JkZXJEYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzLmRhdGEudXNlckFwaS5pZEF1dGgocG9zdERhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyAgICAgd3gucmVMYXVuY2goe1xuICAgICAgICAvLyAgICAgICAgIHVybDogJy9wYWdlcy9teS9teSdcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG59KTtcbiJdfQ==