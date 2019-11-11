"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("../../utils/login");
var app = getApp();
Page({
    data: {
        profile: {}
    },
    onLoad: function () {
    },
    onShow: function () {
        var _this = this;
        login_1.GetProfile(app, function (profile) {
            _this.setData({
                profile: profile
            });
            console.log(_this.data.profile);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLDJDQUE2QztBQUU3QyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVEsRUFBRTtLQUNwQjtJQUNELE1BQU07SUFDTixDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQU9DO1FBTkcsa0JBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBQyxPQUFPO1lBQ3BCLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi9hcHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy91c2VyJztcbmltcG9ydCB7R2V0UHJvZmlsZX0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nO1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBwcm9maWxlOiA8VXNlcj57fVxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICBHZXRQcm9maWxlKGFwcCwgKHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogcHJvZmlsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucHJvZmlsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19