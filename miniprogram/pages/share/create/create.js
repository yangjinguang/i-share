"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upload_video_item_1 = require("../../../utils/types/upload-video-item");
var item_api_1 = require("../../../apis/item-api");
var user_api_1 = require("../../../apis/user-api");
var share_api_1 = require("../../../apis/share-api");
var settings_api_1 = require("../../../apis/settings-api");
var student_api_1 = require("../../../apis/student-api");
Page({
    data: {
        userApi: {},
        itemApi: {},
        shareApi: {},
        settingsApi: {},
        studentApi: {},
        selectedVideo: {},
        upToken: '',
        itemLendOrders: {},
        itemLendOrdersArr: [],
        itemLendOrdersIndex: 0,
        profile: {},
        students: [],
        studentArr: [],
        studentIndex: 0
    },
    onLoad: function () {
        this.setData({
            userApi: new user_api_1.UserApi(),
            itemApi: new item_api_1.ItemApi(),
            shareApi: new share_api_1.ShareApi(),
            settingsApi: new settings_api_1.SettingsApi(),
            studentApi: new student_api_1.StudentApi()
        });
    },
    onShow: function () {
        var _this = this;
        this.getMyItems();
        this.getChildren();
        this.data.settingsApi.uploadToken().then(function (result) {
            _this.setData({
                upToken: result
            });
        });
    },
    bindRecordChange: function (e) {
        this.setData({
            itemLendOrdersIndex: e.detail.value
        });
    },
    getChildren: function () {
        var _this = this;
        this.data.studentApi.getMy().then(function (result) {
            _this.setData({
                students: result,
                studentArr: result.map(function (i) { return i.name; })
            });
            console.log(_this.data.studentArr);
        });
    },
    bindChildChange: function (e) {
        this.setData({
            childIndex: e.detail.value
        });
    },
    getMyItems: function () {
        var _this = this;
        this.data.itemApi.getMyLendOrders([2], 1, 9999).then(function (result) {
            _this.setData({
                itemLendOrders: result.list,
                itemLendOrdersArr: result && result.list ? result.list.map(function (i) { return i.itemTitle; }) : []
            });
        });
    },
    chooseVideo: function () {
        var _this = this;
        wx.chooseVideo({
            sourceType: ['camera', 'album'],
            maxDuration: 60,
            success: function (res) {
                console.log(res);
                var fileItem = new upload_video_item_1.UploadVideoItemObj(_this.data.upToken, res, function (result) {
                    _this.setData({
                        selectedVideo: result
                    });
                });
                fileItem.upload();
                _this.setData({
                    selectedVideo: fileItem
                });
            }
        });
    },
    formSubmit: function (e) {
        var lendOrder = this.data.itemLendOrders[this.data.itemLendOrdersIndex];
        var student = this.data.students[this.data.studentIndex];
        var selectedVideo = this.data.selectedVideo;
        if (!selectedVideo.success) {
            wx.showToast({
                image: '/icons/exclamation-circle.png',
                title: '视频未成功上传'
            });
            return;
        }
        var newShare = {
            itemId: lendOrder.itemId,
            studentId: student.id,
            media: {
                path: selectedVideo.fileName,
                duration: selectedVideo.duration,
                size: selectedVideo.size,
                width: selectedVideo.width,
                height: selectedVideo.height
            },
            desc: e.detail.value['desc']
        };
        this.data.shareApi.create(newShare).then(function (result) {
            console.log(result);
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEVBQTJGO0FBQzNGLG1EQUErQztBQUUvQyxtREFBK0M7QUFJL0MscURBQWlEO0FBRWpELDJEQUF1RDtBQUN2RCx5REFBcUQ7QUFFckQsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsT0FBTyxFQUFXLEVBQUU7UUFDcEIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsV0FBVyxFQUFlLEVBQUU7UUFDNUIsVUFBVSxFQUFjLEVBQUU7UUFDMUIsYUFBYSxFQUFtQixFQUFFO1FBQ2xDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsY0FBYyxFQUFtQixFQUFFO1FBQ25DLGlCQUFpQixFQUFZLEVBQUU7UUFDL0IsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixPQUFPLEVBQVEsRUFBRTtRQUNqQixRQUFRLEVBQWEsRUFBRTtRQUN2QixVQUFVLEVBQVksRUFBRTtRQUN4QixZQUFZLEVBQUUsQ0FBQztLQUNsQjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtZQUN0QixPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7WUFDeEIsV0FBVyxFQUFFLElBQUksMEJBQVcsRUFBRTtZQUM5QixVQUFVLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1NBQy9CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQU4saUJBUUM7UUFQRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDM0MsS0FBSSxDQUFDLE9B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Q0FBQyxTQUFTLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLCtCQUErQjtnQkFDdEMsS0FBSyxFQUFFLFNBQVM7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsSUFBTSxRQUFRLEdBQVU7WUFDcEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1lBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNyQixLQUFLLEVBQWM7Z0JBQ2YsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRO2dCQUM1QixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVE7Z0JBQ2hDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtnQkFDeEIsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLO2dCQUMxQixNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU07YUFDL0I7WUFDRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQy9CLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ1osS0FBSyxFQUFFLENBQUM7YUFDWCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1VwbG9hZFZpZGVvSXRlbSwgVXBsb2FkVmlkZW9JdGVtT2JqfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy91cGxvYWQtdmlkZW8taXRlbSc7XG5pbXBvcnQge0l0ZW1BcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvaXRlbS1hcGknO1xuaW1wb3J0IHtTdHVkZW50fSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9zdHVkZW50JztcbmltcG9ydCB7VXNlckFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy91c2VyLWFwaSc7XG5pbXBvcnQge1NoYXJlfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9zaGFyZSc7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtJdGVtTGVuZE9yZGVyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pdGVtLWxlbmQtb3JkZXInO1xuaW1wb3J0IHtTaGFyZUFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9zaGFyZS1hcGknO1xuaW1wb3J0IHtTaGFyZU1lZGlhfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9zaGFyZS1tZWRpYSc7XG5pbXBvcnQge1NldHRpbmdzQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL3NldHRpbmdzLWFwaSc7XG5pbXBvcnQge1N0dWRlbnRBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvc3R1ZGVudC1hcGknO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIHVzZXJBcGk6IDxVc2VyQXBpPnt9LFxuICAgICAgICBpdGVtQXBpOiA8SXRlbUFwaT57fSxcbiAgICAgICAgc2hhcmVBcGk6IDxTaGFyZUFwaT57fSxcbiAgICAgICAgc2V0dGluZ3NBcGk6IDxTZXR0aW5nc0FwaT57fSxcbiAgICAgICAgc3R1ZGVudEFwaTogPFN0dWRlbnRBcGk+e30sXG4gICAgICAgIHNlbGVjdGVkVmlkZW86IDxVcGxvYWRWaWRlb0l0ZW0+e30sXG4gICAgICAgIHVwVG9rZW46ICcnLFxuICAgICAgICBpdGVtTGVuZE9yZGVyczogPEl0ZW1MZW5kT3JkZXJbXT57fSxcbiAgICAgICAgaXRlbUxlbmRPcmRlcnNBcnI6IDxzdHJpbmdbXT5bXSxcbiAgICAgICAgaXRlbUxlbmRPcmRlcnNJbmRleDogMCxcbiAgICAgICAgcHJvZmlsZTogPFVzZXI+e30sXG4gICAgICAgIHN0dWRlbnRzOiA8U3R1ZGVudFtdPltdLFxuICAgICAgICBzdHVkZW50QXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIHN0dWRlbnRJbmRleDogMFxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdXNlckFwaTogbmV3IFVzZXJBcGkoKSxcbiAgICAgICAgICAgIGl0ZW1BcGk6IG5ldyBJdGVtQXBpKCksXG4gICAgICAgICAgICBzaGFyZUFwaTogbmV3IFNoYXJlQXBpKCksXG4gICAgICAgICAgICBzZXR0aW5nc0FwaTogbmV3IFNldHRpbmdzQXBpKCksXG4gICAgICAgICAgICBzdHVkZW50QXBpOiBuZXcgU3R1ZGVudEFwaSgpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldE15SXRlbXMoKTtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLmRhdGEuc2V0dGluZ3NBcGkudXBsb2FkVG9rZW4oKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHVwVG9rZW46IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZFJlY29yZENoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGl0ZW1MZW5kT3JkZXJzSW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zdHVkZW50QXBpLmdldE15KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBzdHVkZW50czogcmVzdWx0LFxuICAgICAgICAgICAgICAgIHN0dWRlbnRBcnI6IHJlc3VsdC5tYXAoaSA9PiBpLm5hbWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5zdHVkZW50QXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIGJpbmRDaGlsZENoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNoaWxkSW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TXlJdGVtcygpIHtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkuZ2V0TXlMZW5kT3JkZXJzKFsyXSwgMSwgOTk5OSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpdGVtTGVuZE9yZGVyczogcmVzdWx0Lmxpc3QsXG4gICAgICAgICAgICAgICAgaXRlbUxlbmRPcmRlcnNBcnI6IHJlc3VsdCAmJiByZXN1bHQubGlzdCA/IHJlc3VsdC5saXN0Lm1hcChpID0+IGkuaXRlbVRpdGxlKSA6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaG9vc2VWaWRlbygpIHtcbiAgICAgICAgd3guY2hvb3NlVmlkZW8oe1xuICAgICAgICAgICAgc291cmNlVHlwZTogWydjYW1lcmEnLCAnYWxidW0nXSxcbiAgICAgICAgICAgIG1heER1cmF0aW9uOiA2MCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJdGVtID0gbmV3IFVwbG9hZFZpZGVvSXRlbU9iaih0aGlzLmRhdGEudXBUb2tlbiwgcmVzLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZpZGVvOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmlsZUl0ZW0udXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmlkZW86IGZpbGVJdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZm9ybVN1Ym1pdChlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgbGVuZE9yZGVyID0gdGhpcy5kYXRhLml0ZW1MZW5kT3JkZXJzW3RoaXMuZGF0YS5pdGVtTGVuZE9yZGVyc0luZGV4XTtcbiAgICAgICAgY29uc3Qgc3R1ZGVudCA9IHRoaXMuZGF0YS5zdHVkZW50c1t0aGlzLmRhdGEuc3R1ZGVudEluZGV4XTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWaWRlbyA9IHRoaXMuZGF0YS5zZWxlY3RlZFZpZGVvO1xuICAgICAgICBpZiAoIXNlbGVjdGVkVmlkZW8uc3VjY2Vzcykge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICBpbWFnZTogJy9pY29ucy9leGNsYW1hdGlvbi1jaXJjbGUucG5nJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+inhumikeacquaIkOWKn+S4iuS8oCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1NoYXJlID0gPFNoYXJlPntcbiAgICAgICAgICAgIGl0ZW1JZDogbGVuZE9yZGVyLml0ZW1JZCxcbiAgICAgICAgICAgIHN0dWRlbnRJZDogc3R1ZGVudC5pZCxcbiAgICAgICAgICAgIG1lZGlhOiA8U2hhcmVNZWRpYT57XG4gICAgICAgICAgICAgICAgcGF0aDogc2VsZWN0ZWRWaWRlby5maWxlTmFtZSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogc2VsZWN0ZWRWaWRlby5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICBzaXplOiBzZWxlY3RlZFZpZGVvLnNpemUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHNlbGVjdGVkVmlkZW8ud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBzZWxlY3RlZFZpZGVvLmhlaWdodFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6IGUuZGV0YWlsLnZhbHVlWydkZXNjJ11cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhLnNoYXJlQXBpLmNyZWF0ZShuZXdTaGFyZSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdfQ==