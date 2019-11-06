"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_api_1 = require("../../apis/item-api");
var class_api_1 = require("../../apis/class-api");
Page({
    data: {
        itemApi: {},
        classApi: {},
        tags: [],
        tagsArr: [],
        items: [],
        classes: [],
        classTree: [],
        classesArr: [],
        classIndex: 0,
        tagIndex: 0,
        tagId: 0,
        page: 1
    },
    onLoad: function () {
        this.setData({
            itemApi: new item_api_1.ItemApi(),
            classApi: new class_api_1.ClassApi()
        });
    },
    onShow: function () {
        var _this = this;
        this.setData({
            tagsArr: [],
            items: [],
            classes: [],
            classTree: [],
            classesArr: [],
            classIndex: 0,
            tagIndex: 0,
            tagId: 0,
            page: 1
        });
        this.data.classApi.classTree().then(function (result) {
            var classes = [];
            var classesArr = ['全部'];
            result.forEach(function (g) {
                var _classes = g.classes || [];
                _classes.forEach(function (c) {
                    classesArr.push(g.name + ' ' + c.name);
                    classes.push(c);
                });
            });
            _this.setData({
                classes: classes,
                classTree: result,
                classesArr: classesArr
            });
        });
        this.data.itemApi.getTags().then(function (result) {
            _this.setData({
                tags: result,
                tagsArr: ['全部'].concat(result.map(function (i) { return i.name; }))
            });
        });
        this.itemsQuery();
    },
    tagSwitch: function (e) {
        var index = e.currentTarget.dataset.tagIndex;
        if (index !== this.data.tagIndex) {
            this.setData({
                tagIndex: index
            });
        }
        var tagId = 0;
        if (index >= 0) {
            tagId = this.data.tags[index].id;
        }
        this.setData({
            items: [],
            page: 1
        });
        this.itemsQuery(this.data.page, tagId);
    },
    itemsQuery: function (page, tagId) {
        var _this = this;
        page = page || this.data.page;
        tagId = tagId || this.data.tagId;
        this.data.itemApi.query(page, 20, tagId).then(function (result) {
            var items = _this.data.items || [];
            if (result.list && result.list.length > 0) {
                items = items.concat(result.list);
            }
            _this.setData({
                items: items,
                page: result.pagination.page
            });
        });
    },
    toDetail: function (e) {
        var id = e.currentTarget.dataset.itemId;
        if (id) {
            wx.navigateTo({
                url: '/pages/item/detail/detail?id=' + id
            });
        }
    },
    bindTagFilterChange: function (e) {
        var index = e.detail.value;
        var tagId = 0;
        if (index > 0) {
            tagId = this.data.tags[index - 1].id;
        }
        if (index !== this.data.tagIndex) {
            this.setData({
                tagIndex: index,
                tagId: tagId
            });
        }
        this.setData({
            items: [],
            page: 1
        });
        this.itemsQuery(this.data.page, tagId);
    },
    bindClassFilterChange: function (e) {
        console.log(e);
        this.setData({
            classIndex: e.detail.value
        });
    },
    toLoan: function (e) {
        wx.navigateTo({
            url: "/pages/item/loan/loan?id=" + e.currentTarget.dataset.itemId
        });
    },
    getMore: function (e) {
        console.log(e);
        this.itemsQuery(this.data.page + 1);
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: '',
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ''
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxnREFBNEM7QUFHNUMsa0RBQThDO0FBSzlDLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLFFBQVEsRUFBWSxFQUFFO1FBQ3RCLElBQUksRUFBYSxFQUFFO1FBQ25CLE9BQU8sRUFBWSxFQUFFO1FBQ3JCLEtBQUssRUFBVSxFQUFFO1FBQ2pCLE9BQU8sRUFBVyxFQUFFO1FBQ3BCLFNBQVMsRUFBVyxFQUFFO1FBQ3RCLFVBQVUsRUFBWSxFQUFFO1FBQ3hCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsUUFBUSxFQUFFLENBQUM7UUFDWCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxDQUFDO0tBQ1Y7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7WUFDdEIsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQW1DQztRQWxDRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsT0FBTyxFQUFZLEVBQUU7WUFDckIsS0FBSyxFQUFVLEVBQUU7WUFDakIsT0FBTyxFQUFXLEVBQUU7WUFDcEIsU0FBUyxFQUFXLEVBQUU7WUFDdEIsVUFBVSxFQUFZLEVBQUU7WUFDeEIsVUFBVSxFQUFFLENBQUM7WUFDYixRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3RDLElBQUksT0FBTyxHQUFZLEVBQUUsQ0FBQztZQUMxQixJQUFJLFVBQVUsR0FB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SUFDRCxNQUFNLFlBQUMsQ0FBYztRQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLDhCQUE0QixDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFRO1NBQ3BFLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxPQUFPLFlBQUMsQ0FBYztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFdBQVcsWUFBQyxDQUFNO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2NhdGFsb2cvY2F0YWxvZy5qc1xuaW1wb3J0IHtJdGVtQXBpfSBmcm9tICcuLi8uLi9hcGlzL2l0ZW0tYXBpJztcbmltcG9ydCB7SXRlbVRhZ30gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvaXRlbS10YWcnO1xuaW1wb3J0IHtJdGVtfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9pdGVtJztcbmltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7Q2xhc3N9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2NsYXNzJztcbmltcG9ydCB7V3hCaW5kRXZlbnR9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3d4LWJpbmQtZXZlbnQnO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGl0ZW1BcGk6IDxJdGVtQXBpPnt9LFxuICAgICAgICBjbGFzc0FwaTogPENsYXNzQXBpPnt9LFxuICAgICAgICB0YWdzOiA8SXRlbVRhZ1tdPltdLFxuICAgICAgICB0YWdzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIGl0ZW1zOiA8SXRlbVtdPltdLFxuICAgICAgICBjbGFzc2VzOiA8Q2xhc3NbXT5bXSxcbiAgICAgICAgY2xhc3NUcmVlOiA8R3JhZGVbXT5bXSxcbiAgICAgICAgY2xhc3Nlc0FycjogPHN0cmluZ1tdPltdLFxuICAgICAgICBjbGFzc0luZGV4OiAwLFxuICAgICAgICB0YWdJbmRleDogMCxcbiAgICAgICAgdGFnSWQ6IDAsXG4gICAgICAgIHBhZ2U6IDFcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGl0ZW1BcGk6IG5ldyBJdGVtQXBpKCksXG4gICAgICAgICAgICBjbGFzc0FwaTogbmV3IENsYXNzQXBpKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB0YWdzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgICAgICBpdGVtczogPEl0ZW1bXT5bXSxcbiAgICAgICAgICAgIGNsYXNzZXM6IDxDbGFzc1tdPltdLFxuICAgICAgICAgICAgY2xhc3NUcmVlOiA8R3JhZGVbXT5bXSxcbiAgICAgICAgICAgIGNsYXNzZXNBcnI6IDxzdHJpbmdbXT5bXSxcbiAgICAgICAgICAgIGNsYXNzSW5kZXg6IDAsXG4gICAgICAgICAgICB0YWdJbmRleDogMCxcbiAgICAgICAgICAgIHRhZ0lkOiAwLFxuICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhLmNsYXNzQXBpLmNsYXNzVHJlZSgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzID0gPENsYXNzW10+W107XG4gICAgICAgICAgICBsZXQgY2xhc3Nlc0FyciA9IFsn5YWo6YOoJ107XG4gICAgICAgICAgICByZXN1bHQuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfY2xhc3NlcyA9IGcuY2xhc3NlcyB8fCBbXTtcbiAgICAgICAgICAgICAgICBfY2xhc3Nlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzQXJyLnB1c2goZy5uYW1lICsgJyAnICsgYy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgY2xhc3NUcmVlOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgY2xhc3Nlc0FycjogY2xhc3Nlc0FyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS5nZXRUYWdzKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB0YWdzOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgdGFnc0FycjogWyflhajpg6gnXS5jb25jYXQocmVzdWx0Lm1hcChpID0+IGkubmFtZSkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXRlbXNRdWVyeSgpO1xuICAgIH0sXG4gICAgdGFnU3dpdGNoKGU6IGFueSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhZ0luZGV4O1xuICAgICAgICBpZiAoaW5kZXggIT09IHRoaXMuZGF0YS50YWdJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB0YWdJbmRleDogaW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YWdJZCA9IDA7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0YWdJZCA9IHRoaXMuZGF0YS50YWdzW2luZGV4XS5pZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UsIHRhZ0lkKTtcbiAgICB9LFxuICAgIGl0ZW1zUXVlcnkocGFnZT86IG51bWJlciwgdGFnSWQ/OiBudW1iZXIpIHtcbiAgICAgICAgcGFnZSA9IHBhZ2UgfHwgdGhpcy5kYXRhLnBhZ2U7XG4gICAgICAgIHRhZ0lkID0gdGFnSWQgfHwgdGhpcy5kYXRhLnRhZ0lkO1xuICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS5xdWVyeShwYWdlLCAyMCwgdGFnSWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHRoaXMuZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubGlzdCAmJiByZXN1bHQubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQocmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpdGVtczogaXRlbXMsXG4gICAgICAgICAgICAgICAgcGFnZTogcmVzdWx0LnBhZ2luYXRpb24ucGFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdG9EZXRhaWwoZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbUlkO1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9pdGVtL2RldGFpbC9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmluZFRhZ0ZpbHRlckNoYW5nZShlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xuXG4gICAgICAgIGxldCB0YWdJZCA9IDA7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRhZ0lkID0gdGhpcy5kYXRhLnRhZ3NbaW5kZXggLSAxXS5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggIT09IHRoaXMuZGF0YS50YWdJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB0YWdJbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgdGFnSWQ6IHRhZ0lkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgICAgICBwYWdlOiAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UsIHRhZ0lkKTtcbiAgICB9LFxuICAgIGJpbmRDbGFzc0ZpbHRlckNoYW5nZShlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNsYXNzSW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdG9Mb2FuKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2l0ZW0vbG9hbi9sb2FuP2lkPSR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbUlkfWBcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNb3JlKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UgKyAxKTtcbiAgICB9LFxuICAgIHNob3dJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGlucHV0U2hvd2VkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGlkZUlucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaW5wdXRWYWw6ICcnLFxuICAgICAgICAgICAgaW5wdXRTaG93ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xlYXJJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGlucHV0VmFsOiAnJ1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGlucHV0VHlwaW5nKGU6IGFueSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaW5wdXRWYWw6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19