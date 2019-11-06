"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("../../utils/login");
var user_api_1 = require("../../apis/user-api");
var todo_api_1 = require("../../apis/todo-api");
var app = getApp();
Page({
    data: {
        userApi: {},
        profile: {},
        todoApi: {},
        roleTrans: ['', '游客', '管理员', '教师', '家长'],
    },
    onLoad: function () {
        this.setData({
            userApi: new user_api_1.UserApi(),
            todoApi: new todo_api_1.TodoApi()
        });
    },
    onShow: function () {
        var _this = this;
        login_1.CheckLoginStatus(function (res) {
            _this.setData({
                userInfo: res.userInfo,
            });
            _this.getProfile();
            _this.getTodoCount();
        }, function () {
            console.log('not login');
            _this.setData({
                isLogin: false,
            });
        });
    },
    getProfile: function () {
        var _this = this;
        this.data.userApi.profile().then(function (res) {
            _this.profileParse(res);
        });
    },
    getTodoCount: function () {
        var _this = this;
        this.data.todoApi.getCount().then(function (result) {
            _this.setData({
                todoCount: result.count
            });
        });
    },
    profileParse: function (res) {
        var _this = this;
        var roles = res.roles.filter(function (r) { return r !== 0; }).map(function (r) { return _this.data.roleTrans[r]; });
        if (roles.length <= 0) {
            roles.push('游客');
        }
        res.isAdmin = res.roles.indexOf(2) > -1;
        res.isTeacher = res.roles.indexOf(3) > -1;
        app.globalData.profile = res;
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(res);
        }
        this.setData({
            profile: res,
            roles: roles,
            isLogin: true,
            isAdmin: res.isAdmin,
            isTeacher: res.isTeacher
        });
    },
    authSuccess: function () {
        var _this = this;
        login_1.Login(function (profile) {
            _this.profileParse(profile);
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEwRDtBQUcxRCxnREFBNEM7QUFDNUMsZ0RBQTRDO0FBRTVDLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRTdCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLE9BQU8sRUFBUSxFQUFFO1FBQ2pCLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7S0FDM0M7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7WUFDdEIsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQWFDO1FBWkcsd0JBQWdCLENBQUMsVUFBQyxHQUFHO1lBQ2pCLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2FBQ3pCLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFO1lBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUN4QixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFVBQVU7UUFBVixpQkFJQztRQUhHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDaEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxZQUFZO1FBQVosaUJBTUM7UUFMRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BDLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2FBQzFCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFlBQVksWUFBQyxHQUFTO1FBQXRCLGlCQW1CQztRQWxCRyxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLEVBQVAsQ0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUM5RSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25CLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFDRCxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksR0FBRyxDQUFDLHFCQUFxQixFQUFFO1lBQzNCLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRSxLQUFLO1lBRVosT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87WUFDcEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO1NBQzNCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxXQUFXO1FBQVgsaUJBSUM7UUFIRyxhQUFLLENBQUMsVUFBQyxPQUFPO1lBQ1YsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoZWNrTG9naW5TdGF0dXMsIExvZ2lufSBmcm9tICcuLi8uLi91dGlscy9sb2dpbic7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtJTXlBcHB9IGZyb20gJy4uLy4uL2FwcCc7XG5pbXBvcnQge1VzZXJBcGl9IGZyb20gJy4uLy4uL2FwaXMvdXNlci1hcGknO1xuaW1wb3J0IHtUb2RvQXBpfSBmcm9tICcuLi8uLi9hcGlzL3RvZG8tYXBpJztcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICB1c2VyQXBpOiA8VXNlckFwaT57fSxcbiAgICAgICAgcHJvZmlsZTogPFVzZXI+e30sXG4gICAgICAgIHRvZG9BcGk6IDxUb2RvQXBpPnt9LFxuICAgICAgICByb2xlVHJhbnM6IFsnJywgJ+a4uOWuoicsICfnrqHnkIblkZgnLCAn5pWZ5biIJywgJ+WutumVvyddLFxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdXNlckFwaTogbmV3IFVzZXJBcGkoKSxcbiAgICAgICAgICAgIHRvZG9BcGk6IG5ldyBUb2RvQXBpKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICAgIENoZWNrTG9naW5TdGF0dXMoKHJlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdldFByb2ZpbGUoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VG9kb0NvdW50KCk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9naW4nKVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpc0xvZ2luOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFByb2ZpbGUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS51c2VyQXBpLnByb2ZpbGUoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVQYXJzZShyZXMpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFRvZG9Db3VudCgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnRvZG9BcGkuZ2V0Q291bnQoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHRvZG9Db3VudDogcmVzdWx0LmNvdW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBwcm9maWxlUGFyc2UocmVzOiBVc2VyKSB7XG4gICAgICAgIGNvbnN0IHJvbGVzID0gcmVzLnJvbGVzLmZpbHRlcihyID0+IHIgIT09IDApLm1hcChyID0+IHRoaXMuZGF0YS5yb2xlVHJhbnNbcl0pO1xuICAgICAgICBpZiAocm9sZXMubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJvbGVzLnB1c2goJ+a4uOWuoicpO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5pc0FkbWluID0gcmVzLnJvbGVzLmluZGV4T2YoMikgPiAtMTtcbiAgICAgICAgcmVzLmlzVGVhY2hlciA9IHJlcy5yb2xlcy5pbmRleE9mKDMpID4gLTE7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLnByb2ZpbGUgPSByZXM7XG4gICAgICAgIGlmIChhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHByb2ZpbGU6IHJlcyxcbiAgICAgICAgICAgIHJvbGVzOiByb2xlcyxcbiAgICAgICAgICAgIC8vIHNob3dSZWdpc3RlckJ0bjogcm9sZXMubGVuZ3RoIDwgMixcbiAgICAgICAgICAgIGlzTG9naW46IHRydWUsXG4gICAgICAgICAgICBpc0FkbWluOiByZXMuaXNBZG1pbixcbiAgICAgICAgICAgIGlzVGVhY2hlcjogcmVzLmlzVGVhY2hlclxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGF1dGhTdWNjZXNzKCkge1xuICAgICAgICBMb2dpbigocHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlUGFyc2UocHJvZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG59KTtcbiJdfQ==