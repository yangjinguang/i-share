"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_api_1 = require("../../../apis/item-api");
Page({
    data: {
        itemApi: {},
        tags: [],
    },
    onLoad: function () {
        this.setData({
            itemApi: new item_api_1.ItemApi(),
        });
    },
    onShow: function () {
        this.getTags();
    },
    getTags: function () {
        var _this = this;
        this.data.itemApi.getTags().then(function (result) {
            _this.setData({
                tags: result
            });
        });
    },
    _tagCreate: function (id) {
        var url = '/pages/my/tags-mgr/create/create';
        if (id) {
            url = url + '?id=' + id;
        }
        wx.navigateTo({
            url: url
        });
    },
    tagCreate: function () {
        this._tagCreate();
    },
    tagAction: function (e) {
        var _this = this;
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: function (res) {
                switch (res.tapIndex) {
                    case 0:
                        if (e.currentTarget.dataset.tagId) {
                            _this._tagCreate(e.currentTarget.dataset.tagId);
                        }
                        break;
                    case 1:
                        if (e.currentTarget.dataset.tagId) {
                            _this.tagDelete(e.currentTarget.dataset.tagId);
                        }
                        break;
                }
            }
        });
    },
    tagDelete: function (id) {
        var _this = this;
        this.data.itemApi.deleteTag(id).then(function () {
            _this.getTags();
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1tZ3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWdzLW1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUErQztBQUcvQyxJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQVcsRUFBRTtRQUNwQixJQUFJLEVBQWEsRUFBRTtLQUN0QjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsT0FBTztRQUFQLGlCQU1DO1FBTEcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNuQyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsVUFBVSxZQUFDLEVBQVc7UUFDbEIsSUFBSSxHQUFHLEdBQUcsa0NBQWtDLENBQUM7UUFDN0MsSUFBSSxFQUFFLEVBQUU7WUFDSixHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsU0FBUyxZQUFDLENBQU07UUFBaEIsaUJBa0JDO1FBakJHLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBQ1QsUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFO29CQUNsQixLQUFLLENBQUM7d0JBQ0UsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7NEJBQ25DLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2xEO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFOzRCQUMvQixLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNqRDt3QkFDRCxNQUFNO2lCQUNiO1lBQ0wsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxTQUFTLFlBQUMsRUFBVTtRQUFwQixpQkFJQztRQUhHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlbUFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9pdGVtLWFwaSc7XG5pbXBvcnQge0l0ZW1UYWd9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL2l0ZW0tdGFnJztcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBpdGVtQXBpOiA8SXRlbUFwaT57fSxcbiAgICAgICAgdGFnczogPEl0ZW1UYWdbXT5bXSxcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGl0ZW1BcGk6IG5ldyBJdGVtQXBpKCksXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmdldFRhZ3MoKTtcbiAgICB9LFxuICAgIGdldFRhZ3MoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLmdldFRhZ3MoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHRhZ3M6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgX3RhZ0NyZWF0ZShpZD86IG51bWJlcikge1xuICAgICAgICBsZXQgdXJsID0gJy9wYWdlcy9teS90YWdzLW1nci9jcmVhdGUvY3JlYXRlJztcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwgKyAnP2lkPScgKyBpZDtcbiAgICAgICAgfVxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdGFnQ3JlYXRlKCkge1xuICAgICAgICB0aGlzLl90YWdDcmVhdGUoKTtcbiAgICB9LFxuICAgIHRhZ0FjdGlvbihlOiBhbnkpIHtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBbJ+e8lui+kScsICfliKDpmaQnXSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlcy50YXBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhZ0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFnQ3JlYXRlKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhZ0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFnSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0RlbGV0ZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YWdJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdGFnRGVsZXRlKGlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkuZGVsZXRlVGFnKGlkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VGFncygpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiJdfQ==