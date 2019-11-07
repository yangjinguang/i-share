"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_api_1 = require("../../../apis/item-api");
var utils_1 = require("../../../utils/utils");
Page({
    data: {
        from: 1,
        itemApi: {},
        itemId: 0,
        item: {}
    },
    onLoad: function (query) {
        this.setData({
            itemApi: new item_api_1.ItemApi(),
            itemId: Number(query.id),
            from: parseInt(query.from) || 1
        });
    },
    onShow: function () {
        if (this.data.itemId) {
            this.itemDetail(this.data.itemId);
        }
    },
    itemDetail: function (id) {
        var _this = this;
        this.data.itemApi.getOne(id).then(function (result) {
            result.tagsView = result.tags ? result.tags.map(function (i) { return i.name; }).join(',') : '';
            result.createdAtView = result.createdAt ? utils_1.Utils.dateFormat(new Date(result.createdAt), 'yyyy-MM-dd hh:mm:ss') : '';
            result.lend = result.status !== 1;
            _this.setData({
                item: result
            });
        });
    },
    itemLoan: function () {
        var item = this.data.item;
        wx.navigateTo({
            url: "/pages/item/loan/loan?id=" + item.id
        });
    },
    itemEdit: function () {
        var item = this.data.item;
        wx.navigateTo({
            url: "/pages/item/upload/upload?id=" + item.id
        });
    },
    itemDelete: function () {
        var _this = this;
        wx.showModal({
            title: '是否要删除此图书?',
            content: '删除后不可恢复',
            confirmText: '确定',
            cancelText: '取消',
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    if (_this.data.item.id) {
                        _this.data.itemApi.delete(_this.data.item.id).then(function () {
                            wx.navigateBack({
                                delta: 1
                            });
                        });
                    }
                }
                else {
                }
            }
        });
    },
    itemLoanCancel: function () {
        var _this = this;
        wx.showModal({
            title: '是否要强制取消借出状态?',
            content: '取消后不可恢复',
            confirmText: '确定',
            cancelText: '取消',
            success: function (res) {
                if (res.confirm) {
                    if (!_this.data.item.id) {
                        return;
                    }
                    _this.data.itemApi.cancelItemLoan(_this.data.item.id).then(function () {
                        if (_this.data.item.id) {
                            _this.itemDetail(_this.data.item.id);
                        }
                    });
                }
                else {
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQStDO0FBRS9DLDhDQUEyQztBQUUzQyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsQ0FBQztRQUNQLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLE1BQU0sRUFBRSxDQUFDO1FBQ1QsSUFBSSxFQUFRLEVBQUU7S0FDakI7SUFDRCxNQUFNLFlBQUMsS0FBVTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN4QixJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBQ0QsVUFBVSxZQUFDLEVBQVU7UUFBckIsaUJBU0M7UUFSRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNuSCxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNWLEdBQUcsRUFBRSw4QkFBNEIsSUFBSSxDQUFDLEVBQUk7U0FDN0MsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLGtDQUFnQyxJQUFJLENBQUMsRUFBSTtTQUNqRCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsVUFBVTtRQUFWLGlCQW9CQztRQW5CRyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFLElBQUk7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2IsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7d0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQzdDLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0NBQ1osS0FBSyxFQUFFLENBQUM7NkJBQ1gsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO3FCQUFNO2lCQUNOO1lBQ0wsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxjQUFjO1FBQWQsaUJBb0JDO1FBbkJHLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUUsU0FBUztZQUNsQixXQUFXLEVBQUUsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtvQkFDYixJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNwQixPQUFPO3FCQUNWO29CQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3JELElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFOzRCQUNuQixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUN0QztvQkFDTCxDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtpQkFDTjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJdGVtQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL2l0ZW0tYXBpJztcbmltcG9ydCB7SXRlbX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvaXRlbSc7XG5pbXBvcnQge1V0aWxzfSBmcm9tICcuLi8uLi8uLi91dGlscy91dGlscyc7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgZnJvbTogMSxcbiAgICAgICAgaXRlbUFwaTogPEl0ZW1BcGk+e30sXG4gICAgICAgIGl0ZW1JZDogMCxcbiAgICAgICAgaXRlbTogPEl0ZW0+e31cbiAgICB9LFxuICAgIG9uTG9hZChxdWVyeTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBpdGVtQXBpOiBuZXcgSXRlbUFwaSgpLFxuICAgICAgICAgICAgaXRlbUlkOiBOdW1iZXIocXVlcnkuaWQpLFxuICAgICAgICAgICAgZnJvbTogcGFyc2VJbnQocXVlcnkuZnJvbSkgfHwgMVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pdGVtSWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbURldGFpbCh0aGlzLmRhdGEuaXRlbUlkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXRlbURldGFpbChpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLmdldE9uZShpZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnRhZ3NWaWV3ID0gcmVzdWx0LnRhZ3MgPyByZXN1bHQudGFncy5tYXAoaSA9PiBpLm5hbWUpLmpvaW4oJywnKSA6ICcnO1xuICAgICAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdFZpZXcgPSByZXN1bHQuY3JlYXRlZEF0ID8gVXRpbHMuZGF0ZUZvcm1hdChuZXcgRGF0ZShyZXN1bHQuY3JlYXRlZEF0KSwgJ3l5eXktTU0tZGQgaGg6bW06c3MnKSA6ICcnO1xuICAgICAgICAgICAgcmVzdWx0LmxlbmQgPSByZXN1bHQuc3RhdHVzICE9PSAxO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpdGVtOiByZXN1bHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGl0ZW1Mb2FuKCkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhLml0ZW07XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2l0ZW0vbG9hbi9sb2FuP2lkPSR7aXRlbS5pZH1gXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLmRhdGEuaXRlbUFwaS5sb2FuKHRoaXMuZGF0YS5pdGVtLmlkKVxuICAgIH0sXG4gICAgaXRlbUVkaXQoKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGEuaXRlbTtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaXRlbS91cGxvYWQvdXBsb2FkP2lkPSR7aXRlbS5pZH1gXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaXRlbURlbGV0ZSgpIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5piv5ZCm6KaB5Yig6Zmk5q2k5Zu+5LmmPycsXG4gICAgICAgICAgICBjb250ZW50OiAn5Yig6Zmk5ZCO5LiN5Y+v5oGi5aSNJyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaXRlbS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkuZGVsZXRlKHRoaXMuZGF0YS5pdGVtLmlkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpdGVtTG9hbkNhbmNlbCgpIHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5piv5ZCm6KaB5by65Yi25Y+W5raI5YCf5Ye654q25oCBPycsXG4gICAgICAgICAgICBjb250ZW50OiAn5Y+W5raI5ZCO5LiN5Y+v5oGi5aSNJyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5pdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkuY2FuY2VsSXRlbUxvYW4odGhpcy5kYXRhLml0ZW0uaWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtRGV0YWlsKHRoaXMuZGF0YS5pdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19