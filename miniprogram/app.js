"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = require("./utils/login");
App({
    globalData: {},
    onLaunch: function () {
        var _this = this;
        login_1.CheckLoginStatus(function () {
            login_1.GetProfile(_this, function () {
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsdUNBQTJEO0FBWTNELEdBQUcsQ0FBUztJQUNSLFVBQVUsRUFBRSxFQUFFO0lBQ2QsUUFBUTtRQUFSLGlCQUtDO1FBSkcsd0JBQWdCLENBQUM7WUFDYixrQkFBVSxDQUFDLEtBQUksRUFBRTtZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtDaGVja0xvZ2luU3RhdHVzLCBHZXRQcm9maWxlfSBmcm9tICcuL3V0aWxzL2xvZ2luJztcblxuZXhwb3J0IGludGVyZmFjZSBJTXlBcHAge1xuICAgIHVzZXJJbmZvUmVhZHlDYWxsYmFjaz8ocmVzOiBVc2VyKTogdm9pZFxuXG4gICAgZ2xvYmFsRGF0YToge1xuICAgICAgICBwcm9maWxlPzogVXNlcjtcbiAgICAgICAgaXNMb2dpbj86IGJvb2xlYW47XG4gICAgfVxufVxuXG5cbkFwcDxJTXlBcHA+KHtcbiAgICBnbG9iYWxEYXRhOiB7fSxcbiAgICBvbkxhdW5jaCgpIHtcbiAgICAgICAgQ2hlY2tMb2dpblN0YXR1cygoKSA9PiB7XG4gICAgICAgICAgICBHZXRQcm9maWxlKHRoaXMsICgpID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxufSk7XG4iXX0=