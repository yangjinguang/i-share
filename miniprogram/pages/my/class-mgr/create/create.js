"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_api_1 = require("../../../../apis/class-api");
var app = getApp();
Page({
    data: {
        classApi: {},
        type: '',
        title: '',
        gradeId: 0,
        classId: 0,
        isNew: true,
        name: '',
        profile: {}
    },
    onLoad: function (query) {
        var type = query['t'];
        var gradeId = query['gradeId'];
        var classId = query['classId'];
        var title = '';
        var isNew = true;
        if (type === 'grade') {
            isNew = !gradeId;
            title = '年级名称';
        }
        else {
            title = '班级名称';
            isNew = !classId;
        }
        this.setData({
            classApi: new class_api_1.ClassApi(),
            profile: app.globalData.profile,
            type: type || '',
            title: title,
            gradeId: gradeId || '',
            classId: classId || '',
            isNew: isNew
        });
        if (!this.data.isNew) {
            if (type === 'grade') {
                this.getGrade(this.data.gradeId);
            }
            else {
                this.getClass(this.data.classId);
            }
        }
    },
    getGrade: function (gradeId) {
        var _this = this;
        this.data.classApi.getGrade(gradeId).then(function (result) {
            _this.setData({
                name: result.name
            });
        });
    },
    getClass: function (classId) {
        var _this = this;
        this.data.classApi.getClass(classId).then(function (result) {
            _this.setData({
                name: result.name
            });
        });
    },
    formSubmit: function (e) {
        console.log(e);
        if (this.data.type === 'grade') {
            var newGrade = {
                name: e.detail.value['name']
            };
            if (this.data.isNew) {
                console.log(newGrade);
                this.data.classApi.createGrade(newGrade).then(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
            else {
                this.data.classApi.updateGrade(this.data.gradeId, newGrade).then(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
        else {
            var newClass = {
                gradeId: this.data.gradeId,
                name: e.detail.value['name']
            };
            if (this.data.isNew) {
                this.data.classApi.createClass(newClass).then(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
            else {
                this.data.classApi.updateClass(this.data.classId, newClass).then(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQW9EO0FBTXBELElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRTdCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBWSxFQUFFO1FBQ3RCLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxDQUFDO1FBQ1YsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBUSxFQUFFO0tBQ3BCO0lBQ0QsTUFBTSxFQUFOLFVBQU8sS0FBVTtRQUNiLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ2pCLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDbEI7YUFBTTtZQUNILEtBQUssR0FBRyxNQUFNLENBQUM7WUFDZixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtZQUN4QixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQy9CLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRTtZQUN0QixPQUFPLEVBQUUsT0FBTyxJQUFJLEVBQUU7WUFDdEIsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsUUFBUSxFQUFSLFVBQVMsT0FBZTtRQUF4QixpQkFNQztRQUxHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzVDLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFFBQVEsRUFBUixVQUFTLE9BQWU7UUFBeEIsaUJBTUM7UUFMRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNwQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxVQUFVLEVBQVYsVUFBVyxDQUFNO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQU0sUUFBUSxHQUFVO2dCQUNwQixJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2FBQy9CLENBQUM7WUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMxQyxFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUNaLEtBQUssRUFBRSxDQUFDO3FCQUNYLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzdELEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLENBQUM7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjthQUFNO1lBQ0gsSUFBTSxRQUFRLEdBQVU7Z0JBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQzFCLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDL0IsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzFDLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLENBQUM7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDN0QsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDWixLQUFLLEVBQUUsQ0FBQztxQkFDWCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uLy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7Q2xhc3N9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3R5cGVzL2NsYXNzJztcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi8uLi8uLi91dGlscy90eXBlcy91c2VyJztcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBjbGFzc0FwaTogPENsYXNzQXBpPnt9LFxuICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBncmFkZUlkOiAwLFxuICAgICAgICBjbGFzc0lkOiAwLFxuICAgICAgICBpc05ldzogdHJ1ZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHByb2ZpbGU6IDxVc2VyPnt9XG4gICAgfSxcbiAgICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgICAgICBjb25zdCB0eXBlID0gcXVlcnlbJ3QnXTtcbiAgICAgICAgY29uc3QgZ3JhZGVJZCA9IHF1ZXJ5WydncmFkZUlkJ107XG4gICAgICAgIGNvbnN0IGNsYXNzSWQgPSBxdWVyeVsnY2xhc3NJZCddO1xuICAgICAgICBsZXQgdGl0bGUgPSAnJztcbiAgICAgICAgbGV0IGlzTmV3ID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdncmFkZScpIHtcbiAgICAgICAgICAgIGlzTmV3ID0gIWdyYWRlSWQ7XG4gICAgICAgICAgICB0aXRsZSA9ICflubTnuqflkI3np7AnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUgPSAn54+t57qn5ZCN56ewJztcbiAgICAgICAgICAgIGlzTmV3ID0gIWNsYXNzSWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKSxcbiAgICAgICAgICAgIHByb2ZpbGU6IGFwcC5nbG9iYWxEYXRhLnByb2ZpbGUsXG4gICAgICAgICAgICB0eXBlOiB0eXBlIHx8ICcnLFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgZ3JhZGVJZDogZ3JhZGVJZCB8fCAnJyxcbiAgICAgICAgICAgIGNsYXNzSWQ6IGNsYXNzSWQgfHwgJycsXG4gICAgICAgICAgICBpc05ldzogaXNOZXdcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5kYXRhLmlzTmV3KSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2dyYWRlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0R3JhZGUodGhpcy5kYXRhLmdyYWRlSWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENsYXNzKHRoaXMuZGF0YS5jbGFzc0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0R3JhZGUoZ3JhZGVJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS5nZXRHcmFkZShncmFkZUlkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRDbGFzcyhjbGFzc0lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsYXNzQXBpLmdldENsYXNzKGNsYXNzSWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgbmFtZTogcmVzdWx0Lm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1TdWJtaXQoZTogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICBpZiAodGhpcy5kYXRhLnR5cGUgPT09ICdncmFkZScpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0dyYWRlID0gPEdyYWRlPntcbiAgICAgICAgICAgICAgICBuYW1lOiBlLmRldGFpbC52YWx1ZVsnbmFtZSddXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld0dyYWRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuY2xhc3NBcGkuY3JlYXRlR3JhZGUobmV3R3JhZGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS51cGRhdGVHcmFkZSh0aGlzLmRhdGEuZ3JhZGVJZCwgbmV3R3JhZGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDbGFzcyA9IDxDbGFzcz57XG4gICAgICAgICAgICAgICAgZ3JhZGVJZDogdGhpcy5kYXRhLmdyYWRlSWQsXG4gICAgICAgICAgICAgICAgbmFtZTogZS5kZXRhaWwudmFsdWVbJ25hbWUnXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaXNOZXcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuY2xhc3NBcGkuY3JlYXRlQ2xhc3MobmV3Q2xhc3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS51cGRhdGVDbGFzcyh0aGlzLmRhdGEuY2xhc3NJZCwgbmV3Q2xhc3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==