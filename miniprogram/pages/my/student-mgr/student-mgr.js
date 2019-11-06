"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var student_api_1 = require("../../../apis/student-api");
var app = getApp();
Page({
    data: {
        profile: {},
        canMgr: false,
        classId: 0,
        className: '',
        studentApi: {},
        students: []
    },
    onLoad: function (query) {
        var classId = Number(query['classId']);
        var profile = app.globalData.profile;
        var canMgr = false;
        if (profile) {
            if (profile.isAdmin) {
                canMgr = true;
            }
            else {
                profile.classes.forEach(function (i) {
                    if (i.id === classId) {
                        canMgr = true;
                    }
                });
            }
        }
        this.setData({
            profile: profile,
            canMgr: canMgr,
            classId: classId,
            className: query['className'],
            studentApi: new student_api_1.StudentApi()
        });
        console.log(this.data.canMgr);
    },
    onShow: function () {
        this.getStudents();
    },
    getStudents: function () {
        var _this = this;
        this.data.studentApi.getByClass(this.data.classId).then(function (result) {
            console.log(result);
            _this.setData({
                students: result
            });
        });
    },
    _studentCreate: function (studentId) {
        var url = '/pages/my/student-mgr/create/create?classId=' + this.data.classId;
        if (studentId) {
            url = url + '&studentId=' + studentId;
        }
        wx.navigateTo({
            url: url
        });
    },
    studentCreate: function () {
        this._studentCreate();
    },
    studentDelete: function (studentId) {
        var _this = this;
        this.data.studentApi.delete(studentId).then(function () {
            _this.getStudents();
        });
    },
    studentAction: function (e) {
        var _this = this;
        if (!this.data.canMgr) {
            return;
        }
        var studentId = e.currentTarget.dataset.studentId;
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: function (res) {
                switch (res.tapIndex) {
                    case 0:
                        if (studentId) {
                            _this._studentCreate(studentId);
                        }
                        break;
                    case 1:
                        if (studentId) {
                            _this.studentDelete(studentId);
                        }
                        break;
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC1tZ3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHVkZW50LW1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFxRDtBQUtyRCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUU3QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVEsRUFBRTtRQUNqQixNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxDQUFDO1FBQ1YsU0FBUyxFQUFFLEVBQUU7UUFDYixVQUFVLEVBQWMsRUFBRTtRQUMxQixRQUFRLEVBQWEsRUFBRTtLQUMxQjtJQUNELE1BQU0sWUFBQyxLQUFVO1FBQ2IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQUU7d0JBQ2xCLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ2pCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzdCLFVBQVUsRUFBRSxJQUFJLHdCQUFVLEVBQUU7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxXQUFXO1FBQVgsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxRQUFRLEVBQUUsTUFBTTthQUNuQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxjQUFjLFlBQUMsU0FBa0I7UUFDN0IsSUFBSSxHQUFHLEdBQUcsOENBQThDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0UsSUFBSSxTQUFTLEVBQUU7WUFDWCxHQUFHLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDekM7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsYUFBYTtRQUNULElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsYUFBYSxZQUFDLFNBQWlCO1FBQS9CLGlCQUlDO1FBSEcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsYUFBYSxZQUFDLENBQU07UUFBcEIsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDcEQsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFDdEIsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQzt3QkFDRixJQUFJLFNBQVMsRUFBRTs0QkFDWCxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNsQzt3QkFDRCxNQUFNO29CQUNWLEtBQUssQ0FBQzt3QkFDRixJQUFJLFNBQVMsRUFBRTs0QkFDWCxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUNqQzt3QkFDRCxNQUFNO2lCQUNiO1lBQ0wsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0dWRlbnRBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvc3R1ZGVudC1hcGknO1xuaW1wb3J0IHtTdHVkZW50fSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9zdHVkZW50JztcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi8uLi9hcHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy91c2VyJztcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBwcm9maWxlOiA8VXNlcj57fSxcbiAgICAgICAgY2FuTWdyOiBmYWxzZSxcbiAgICAgICAgY2xhc3NJZDogMCxcbiAgICAgICAgY2xhc3NOYW1lOiAnJyxcbiAgICAgICAgc3R1ZGVudEFwaTogPFN0dWRlbnRBcGk+e30sXG4gICAgICAgIHN0dWRlbnRzOiA8U3R1ZGVudFtdPltdXG4gICAgfSxcbiAgICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgICAgICBsZXQgY2xhc3NJZCA9IE51bWJlcihxdWVyeVsnY2xhc3NJZCddKTtcbiAgICAgICAgbGV0IHByb2ZpbGUgPSBhcHAuZ2xvYmFsRGF0YS5wcm9maWxlO1xuICAgICAgICBsZXQgY2FuTWdyID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHByb2ZpbGUpIHtcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmlzQWRtaW4pIHtcbiAgICAgICAgICAgICAgICBjYW5NZ3IgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9maWxlLmNsYXNzZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkuaWQgPT09IGNsYXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbk1nciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgICAgY2FuTWdyOiBjYW5NZ3IsXG4gICAgICAgICAgICBjbGFzc0lkOiBjbGFzc0lkLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBxdWVyeVsnY2xhc3NOYW1lJ10sXG4gICAgICAgICAgICBzdHVkZW50QXBpOiBuZXcgU3R1ZGVudEFwaSgpXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuY2FuTWdyKTtcbiAgICB9LFxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xuICAgIH0sXG4gICAgZ2V0U3R1ZGVudHMoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zdHVkZW50QXBpLmdldEJ5Q2xhc3ModGhpcy5kYXRhLmNsYXNzSWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHN0dWRlbnRzOiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIF9zdHVkZW50Q3JlYXRlKHN0dWRlbnRJZD86IG51bWJlcikge1xuICAgICAgICBsZXQgdXJsID0gJy9wYWdlcy9teS9zdHVkZW50LW1nci9jcmVhdGUvY3JlYXRlP2NsYXNzSWQ9JyArIHRoaXMuZGF0YS5jbGFzc0lkO1xuICAgICAgICBpZiAoc3R1ZGVudElkKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwgKyAnJnN0dWRlbnRJZD0nICsgc3R1ZGVudElkO1xuICAgICAgICB9XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdHVkZW50Q3JlYXRlKCkge1xuICAgICAgICB0aGlzLl9zdHVkZW50Q3JlYXRlKCk7XG4gICAgfSxcbiAgICBzdHVkZW50RGVsZXRlKHN0dWRlbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zdHVkZW50QXBpLmRlbGV0ZShzdHVkZW50SWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTdHVkZW50cygpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHN0dWRlbnRBY3Rpb24oZTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhLmNhbk1ncikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0dWRlbnRJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnN0dWRlbnRJZDtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBbJ+e8lui+kScsICfliKDpmaQnXSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcy50YXBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R1ZGVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R1ZGVudENyZWF0ZShzdHVkZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnREZWxldGUoc3R1ZGVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXX0=