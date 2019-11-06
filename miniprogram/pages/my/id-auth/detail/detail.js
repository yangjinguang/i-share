"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_api_1 = require("../../../../apis/user-api");
var student_api_1 = require("../../../../apis/student-api");
Page({
    data: {
        userApi: {},
        studentApi: {},
        idAuthOrder: {},
        students: [],
        studentsArr: [],
        studentIndex: 0,
        orderId: 0,
        isAgree: true,
        role: 0
    },
    onLoad: function (query) {
        this.setData({
            userApi: new user_api_1.UserApi(),
            studentApi: new student_api_1.StudentApi(),
            orderId: Number(query['orderId'])
        });
    },
    onShow: function () {
        this.getOrderDetail();
    },
    getOrderDetail: function () {
        var _this = this;
        if (this.data.orderId) {
            this.data.userApi.getIdAuthDetail(this.data.orderId).then(function (result) {
                _this.setData({
                    idAuthOrder: result,
                    role: result.role
                });
                if (_this.data.role === 4) {
                    _this.getStudents(result.classId);
                }
            });
        }
    },
    getStudents: function (classId) {
        var _this = this;
        this.data.studentApi.getByClass(classId).then(function (result) {
            _this.setData({
                students: result,
                studentsArr: result ? result.map(function (i) { return i.name; }) : []
            });
        });
    },
    studentSelectChange: function (e) {
        this.setData({
            studentIndex: e.detail.value
        });
    },
    agreeChange: function (e) {
        this.setData({
            isAgree: e.detail.value == 'true'
        });
        console.log(this.data);
    },
    formSubmit: function (e) {
        var postData = {
            orderId: this.data.orderId,
            agree: this.data.isAgree,
            rejectMsg: e.detail.value['rejectMsg']
        };
        if (this.data.role === 4) {
            if (this.data.students && this.data.students[this.data.studentIndex]) {
                postData['studentId'] = this.data.students[this.data.studentIndex].id;
            }
            else {
                wx.showModal({
                    title: '',
                    content: '必须选择一个孩子',
                    showCancel: false,
                    success: function () {
                    }
                });
                return;
            }
        }
        this.data.userApi.idAuthHandle(postData).then(function () {
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0RBQWtEO0FBR2xELDREQUF3RDtBQUd4RCxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVcsRUFBRTtRQUNwQixVQUFVLEVBQWMsRUFBRTtRQUMxQixXQUFXLEVBQWUsRUFBRTtRQUM1QixRQUFRLEVBQWEsRUFBRTtRQUN2QixXQUFXLEVBQVksRUFBRTtRQUN6QixZQUFZLEVBQUUsQ0FBQztRQUNmLE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsQ0FBQztLQUNWO0lBQ0QsTUFBTSxFQUFOLFVBQU8sS0FBVTtRQUNiLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDVixPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLFVBQVUsRUFBRSxJQUFJLHdCQUFVLEVBQUU7WUFDNUIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELGNBQWMsRUFBZDtRQUFBLGlCQVlDO1FBWEcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUM1RCxLQUFJLENBQUMsT0FBUSxDQUFDO29CQUNWLFdBQVcsRUFBRSxNQUFNO29CQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7aUJBQ3BCLENBQUMsQ0FBQztnQkFDSCxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtvQkFDdEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3BDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCxXQUFXLEVBQVgsVUFBWSxPQUFlO1FBQTNCLGlCQU9DO1FBTkcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDaEQsS0FBSSxDQUFDLE9BQVEsQ0FBQztnQkFDVixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFXLEVBQUU7YUFDL0QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsbUJBQW1CLEVBQW5CLFVBQW9CLENBQU07UUFDdEIsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNWLFlBQVksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDL0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFdBQVcsRUFBWCxVQUFZLENBQU07UUFDZCxJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU07U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELFVBQVUsRUFBVixVQUFXLENBQU07UUFFYixJQUFNLFFBQVEsR0FBeUI7WUFDbkMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztZQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ3hCLFNBQVMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7U0FDekMsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDbEUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNILEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1QsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFVBQVUsRUFBRSxLQUFLO29CQUNqQixPQUFPLEVBQUU7b0JBRVQsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNWO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ1osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1VzZXJBcGl9IGZyb20gJy4uLy4uLy4uLy4uL2FwaXMvdXNlci1hcGknO1xuaW1wb3J0IHtJZEF1dGhPcmRlcn0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvdHlwZXMvaWQtYXV0aC1vcmRlcic7XG5pbXBvcnQge1VzZXJJZEF1dGhIYW5kbGVEYXRhfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy90eXBlcy91c2VyLWlkLWF1dGgtaGFuZGxlLWRhdGEnO1xuaW1wb3J0IHtTdHVkZW50QXBpfSBmcm9tICcuLi8uLi8uLi8uLi9hcGlzL3N0dWRlbnQtYXBpJztcbmltcG9ydCB7U3R1ZGVudH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvdHlwZXMvc3R1ZGVudCc7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgdXNlckFwaTogPFVzZXJBcGk+e30sXG4gICAgICAgIHN0dWRlbnRBcGk6IDxTdHVkZW50QXBpPnt9LFxuICAgICAgICBpZEF1dGhPcmRlcjogPElkQXV0aE9yZGVyPnt9LFxuICAgICAgICBzdHVkZW50czogPFN0dWRlbnRbXT5bXSxcbiAgICAgICAgc3R1ZGVudHNBcnI6IDxzdHJpbmdbXT5bXSxcbiAgICAgICAgc3R1ZGVudEluZGV4OiAwLFxuICAgICAgICBvcmRlcklkOiAwLFxuICAgICAgICBpc0FncmVlOiB0cnVlLFxuICAgICAgICByb2xlOiAwXG4gICAgfSxcbiAgICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIHVzZXJBcGk6IG5ldyBVc2VyQXBpKCksXG4gICAgICAgICAgICBzdHVkZW50QXBpOiBuZXcgU3R1ZGVudEFwaSgpLFxuICAgICAgICAgICAgb3JkZXJJZDogTnVtYmVyKHF1ZXJ5WydvcmRlcklkJ10pXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldE9yZGVyRGV0YWlsKCk7XG4gICAgfSxcbiAgICBnZXRPcmRlckRldGFpbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5vcmRlcklkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEudXNlckFwaS5nZXRJZEF1dGhEZXRhaWwodGhpcy5kYXRhLm9yZGVySWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgICAgICAgICAgaWRBdXRoT3JkZXI6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogcmVzdWx0LnJvbGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJvbGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50cyhyZXN1bHQuY2xhc3NJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldFN0dWRlbnRzKGNsYXNzSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc3R1ZGVudEFwaS5nZXRCeUNsYXNzKGNsYXNzSWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgIHN0dWRlbnRzOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgc3R1ZGVudHNBcnI6IHJlc3VsdCA/IHJlc3VsdC5tYXAoaSA9PiBpLm5hbWUpIDogPHN0cmluZ1tdPltdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdHVkZW50U2VsZWN0Q2hhbmdlKGU6IGFueSkge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIHN0dWRlbnRJbmRleDogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhZ3JlZUNoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICBpc0FncmVlOiBlLmRldGFpbC52YWx1ZSA9PSAndHJ1ZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgfSxcbiAgICBmb3JtU3VibWl0KGU6IGFueSkge1xuXG4gICAgICAgIGNvbnN0IHBvc3REYXRhID0gPFVzZXJJZEF1dGhIYW5kbGVEYXRhPntcbiAgICAgICAgICAgIG9yZGVySWQ6IHRoaXMuZGF0YS5vcmRlcklkLFxuICAgICAgICAgICAgYWdyZWU6IHRoaXMuZGF0YS5pc0FncmVlLFxuICAgICAgICAgICAgcmVqZWN0TXNnOiBlLmRldGFpbC52YWx1ZVsncmVqZWN0TXNnJ11cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5yb2xlID09PSA0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnN0dWRlbnRzICYmIHRoaXMuZGF0YS5zdHVkZW50c1t0aGlzLmRhdGEuc3R1ZGVudEluZGV4XSkge1xuICAgICAgICAgICAgICAgIHBvc3REYXRhWydzdHVkZW50SWQnXSA9IHRoaXMuZGF0YS5zdHVkZW50c1t0aGlzLmRhdGEuc3R1ZGVudEluZGV4XS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5b+F6aG76YCJ5oup5LiA5Liq5a2p5a2QJyxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS51c2VyQXBpLmlkQXV0aEhhbmRsZShwb3N0RGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXX0=