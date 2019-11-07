"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_api_1 = require("../../../apis/item-api");
var student_api_1 = require("../../../apis/student-api");
var app = getApp();
Page({
    data: {
        studentApi: {},
        itemApi: {},
        profile: {},
        itemId: 0,
        students: [],
        studentsArr: [],
        studentIndex: 0,
    },
    onLoad: function (query) {
        this.setData({
            studentApi: new student_api_1.StudentApi(),
            itemApi: new item_api_1.ItemApi(),
            profile: app.globalData.profile,
            itemId: query.id
        });
    },
    onShow: function () {
        this.getStudents();
    },
    getStudents: function () {
        var _this = this;
        this.data.studentApi.getMy().then(function (result) {
            _this.setData({
                students: result,
                studentsArr: result.map(function (i) { return i.name; })
            });
        });
    },
    bindChildIndexChange: function (e) {
        this.setData({
            studentIndex: e.detail.value
        });
    },
    formSubmit: function () {
        var newRecord = {
            itemId: this.data.itemId,
            studentId: this.data.students[this.data.studentIndex].id
        };
        this.data.itemApi.lend(newRecord).then(function (result) {
            console.log(result);
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtREFBK0M7QUFJL0MseURBQXFEO0FBRXJELElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFDO0FBRTdCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFVBQVUsRUFBYyxFQUFFO1FBQzFCLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLE9BQU8sRUFBUSxFQUFFO1FBQ2pCLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFhLEVBQUU7UUFDdkIsV0FBVyxFQUFZLEVBQUU7UUFDekIsWUFBWSxFQUFFLENBQUM7S0FDbEI7SUFDRCxNQUFNLFlBQUMsS0FBVTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxVQUFVLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1lBQzVCLE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7WUFDdEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTztZQUMvQixNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFdBQVc7UUFBWCxpQkFjQztRQWJHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDcEMsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQzthQUN2QyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQVFQLENBQUM7SUFDRCxvQkFBb0IsWUFBQyxDQUFNO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxVQUFVO1FBQ04sSUFBTSxTQUFTLEdBQWtCO1lBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtTQUMzRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNaLEtBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJdGVtTGVuZE9yZGVyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pdGVtLWxlbmQtb3JkZXInO1xuaW1wb3J0IHtJdGVtQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL2l0ZW0tYXBpJztcbmltcG9ydCB7U3R1ZGVudH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvc3R1ZGVudCc7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtJTXlBcHB9IGZyb20gJy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQge1N0dWRlbnRBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvc3R1ZGVudC1hcGknO1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIHN0dWRlbnRBcGk6IDxTdHVkZW50QXBpPnt9LFxuICAgICAgICBpdGVtQXBpOiA8SXRlbUFwaT57fSxcbiAgICAgICAgcHJvZmlsZTogPFVzZXI+e30sXG4gICAgICAgIGl0ZW1JZDogMCxcbiAgICAgICAgc3R1ZGVudHM6IDxTdHVkZW50W10+W10sXG4gICAgICAgIHN0dWRlbnRzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIHN0dWRlbnRJbmRleDogMCxcbiAgICB9LFxuICAgIG9uTG9hZChxdWVyeTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzdHVkZW50QXBpOiBuZXcgU3R1ZGVudEFwaSgpLFxuICAgICAgICAgICAgaXRlbUFwaTogbmV3IEl0ZW1BcGkoKSxcbiAgICAgICAgICAgIHByb2ZpbGU6IGFwcC5nbG9iYWxEYXRhLnByb2ZpbGUsXG4gICAgICAgICAgICBpdGVtSWQ6IHF1ZXJ5LmlkXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldFN0dWRlbnRzKCk7XG4gICAgfSxcbiAgICBnZXRTdHVkZW50cygpIHtcbiAgICAgICAgdGhpcy5kYXRhLnN0dWRlbnRBcGkuZ2V0TXkoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHN0dWRlbnRzOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgc3R1ZGVudHNBcnI6IHJlc3VsdC5tYXAoaSA9PiBpLm5hbWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMuZGF0YS51c2VyQXBpLnByb2ZpbGUoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vICAgICBjb25zdCBjaGlsZHJlbiA9IHJlc3VsdCA/IHJlc3VsdC5jaGlsZHJlblJlbGF0aW9uc0RldGFpbHMubWFwKGkgPT4gaS5jaGlsZCkgOiBbXTtcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIC8vICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAvLyAgICAgICAgIGNoaWxkcmVuQXJyOiBjaGlsZHJlbi5tYXAoaSA9PiBpLm5hbWUpXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSk7XG4gICAgfSxcbiAgICBiaW5kQ2hpbGRJbmRleENoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHN0dWRlbnRJbmRleDogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JtU3VibWl0KCkge1xuICAgICAgICBjb25zdCBuZXdSZWNvcmQgPSA8SXRlbUxlbmRPcmRlcj57XG4gICAgICAgICAgICBpdGVtSWQ6IHRoaXMuZGF0YS5pdGVtSWQsXG4gICAgICAgICAgICBzdHVkZW50SWQ6IHRoaXMuZGF0YS5zdHVkZW50c1t0aGlzLmRhdGEuc3R1ZGVudEluZGV4XS5pZFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS5sZW5kKG5ld1JlY29yZCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19