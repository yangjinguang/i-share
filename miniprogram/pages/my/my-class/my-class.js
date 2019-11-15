"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_api_1 = require("../../../apis/class-api");
var login_1 = require("../../../utils/login");
var user_api_1 = require("../../../apis/user-api");
var app = getApp();
Page({
    data: {
        classApi: {},
        classList: [],
        userApi: {},
        profile: {}
    },
    onLoad: function () {
        var _this = this;
        login_1.GetProfile(app, function (profile) {
            _this.setData({
                classApi: new class_api_1.ClassApi(),
                userApi: new user_api_1.UserApi(),
                profile: profile
            });
        });
        this.getClass();
    },
    getClass: function () {
        var _this = this;
        this.data.classApi.getMyClass().then(function (result) {
            _this.setData({
                classList: result
            });
        });
    },
    classAction: function (e) {
        var _this = this;
        wx.showActionSheet({
            itemList: ['退出'],
            success: function (res) {
                switch (res.tapIndex) {
                    case 0:
                        if (e.currentTarget.dataset.classId) {
                            _this.quitClass(e.currentTarget.dataset.classId);
                        }
                        break;
                }
            }
        });
    },
    quitClass: function (classId) {
        var _this = this;
        wx.showModal({
            title: '确定要退出此班级吗?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: function (res) {
                if (res.confirm) {
                    _this.data.userApi.unbindClass(_this.data.profile.id, classId).then(function () {
                        _this.getClass();
                    });
                }
                else {
                }
            }
        });
    },
    toIdAuth: function () {
        wx.navigateTo({
            url: '/pages/my/id-auth/id-auth?roleIndex=1'
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteS1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFpRDtBQUlqRCw4Q0FBZ0Q7QUFDaEQsbURBQStDO0FBRS9DLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBQzdCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBWSxFQUFFO1FBQ3RCLFNBQVMsRUFBVyxFQUFFO1FBQ3RCLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLE9BQU8sRUFBUSxFQUFFO0tBQ3BCO0lBQ0QsTUFBTTtRQUFOLGlCQVVDO1FBVEcsa0JBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBQSxPQUFPO1lBQ25CLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtnQkFDeEIsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtnQkFDdEIsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELFFBQVE7UUFBUixpQkFNQztRQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDeEMsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxTQUFTLEVBQUUsTUFBTTthQUNwQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxXQUFXLFlBQUMsQ0FBTTtRQUFsQixpQkFhQztRQVpHLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDaEIsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQzt3QkFDRixJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTs0QkFDakMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDbkQ7d0JBQ0QsTUFBTTtpQkFDYjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUyxZQUFDLE9BQWU7UUFBekIsaUJBZUM7UUFkRyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLFlBQVk7WUFDbkIsT0FBTyxFQUFFLEVBQUU7WUFDWCxXQUFXLEVBQUUsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtvQkFDYixLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDOUQsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtpQkFDTjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsUUFBUTtRQUNKLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDVixHQUFHLEVBQUUsdUNBQXVDO1NBQy9DLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NsYXNzQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL2NsYXNzLWFwaSc7XG5pbXBvcnQge0NsYXNzfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9jbGFzcyc7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtJTXlBcHB9IGZyb20gJy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQge0dldFByb2ZpbGV9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2xvZ2luJztcbmltcG9ydCB7VXNlckFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy91c2VyLWFwaSc7XG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGNsYXNzQXBpOiA8Q2xhc3NBcGk+e30sXG4gICAgICAgIGNsYXNzTGlzdDogPENsYXNzW10+W10sXG4gICAgICAgIHVzZXJBcGk6IDxVc2VyQXBpPnt9LFxuICAgICAgICBwcm9maWxlOiA8VXNlcj57fVxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBHZXRQcm9maWxlKGFwcCwgcHJvZmlsZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKSxcbiAgICAgICAgICAgICAgICB1c2VyQXBpOiBuZXcgVXNlckFwaSgpLFxuICAgICAgICAgICAgICAgIHByb2ZpbGU6IHByb2ZpbGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdldENsYXNzKCk7XG4gICAgfSxcbiAgICBnZXRDbGFzcygpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsYXNzQXBpLmdldE15Q2xhc3MoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY2xhc3NMaXN0OiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNsYXNzQWN0aW9uKGU6IGFueSkge1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgICAgaXRlbUxpc3Q6IFsn6YCA5Ye6J10sXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXMudGFwSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNsYXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1aXRDbGFzcyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jbGFzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBxdWl0Q2xhc3MoY2xhc3NJZDogbnVtYmVyKSB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ehruWumuimgemAgOWHuuatpOePree6p+WQlz8nLFxuICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXG4gICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnVzZXJBcGkudW5iaW5kQ2xhc3ModGhpcy5kYXRhLnByb2ZpbGUuaWQsIGNsYXNzSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzcygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB0b0lkQXV0aCgpIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvbXkvaWQtYXV0aC9pZC1hdXRoP3JvbGVJbmRleD0xJ1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdfQ==