"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        filterTagId: 0,
        filterClassId: 0,
        page: 1,
        searchTimer: 0,
        searchResult: []
    },
    onLoad: function () {
        this.setData({
            itemApi: new item_api_1.ItemApi(),
            classApi: new class_api_1.ClassApi()
        });
    },
    onShow: function () {
        this.getBaseData().then(function () {
        });
        this.itemsQuery(1);
    },
    getBaseData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var classes, classesArr, tags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data.classApi.classList()];
                    case 1:
                        classes = _a.sent();
                        classesArr = ['全部'];
                        classes.forEach(function (c) {
                            classesArr.push(c.gradeName + ' ' + c.name);
                        });
                        return [4, this.data.itemApi.getTags()];
                    case 2:
                        tags = _a.sent();
                        this.setData({
                            classes: classes,
                            classesArr: classesArr,
                            tags: tags,
                            tagsArr: ['全部'].concat(tags.map(function (i) { return i.name; }))
                        });
                        return [2];
                }
            });
        });
    },
    itemsQuery: function (page) {
        var _this = this;
        page = page || this.data.page;
        var tagId = this.data.filterTagId;
        var classId = this.data.filterClassId;
        this.data.itemApi.query(page, 20, tagId, classId).then(function (result) {
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
    bindTagFilterChange: function (e) {
        var index = e.detail.value;
        var tagId = 0;
        if (index > 0) {
            tagId = this.data.tags[index - 1].id;
        }
        if (index !== this.data.tagIndex) {
            this.setData({
                tagIndex: index,
                filterTagId: tagId,
                items: [],
                page: 1
            });
            this.itemsQuery(this.data.page);
        }
    },
    bindClassFilterChange: function (e) {
        var index = e.detail.value;
        var classId = 0;
        if (index > 0) {
            classId = this.data.classes[index - 1].id;
        }
        if (index !== this.data.classIndex) {
            this.setData({
                classIndex: e.detail.value,
                filterClassId: classId,
                items: [],
                page: 1
            });
            this.itemsQuery(this.data.page);
        }
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
        var _this = this;
        this.setData({
            searchTimer: new Date().getTime()
        });
        setTimeout(function () {
            if (new Date().getTime() - _this.data.searchTimer >= 500) {
                _this.data.itemApi.search(e.detail.value).then(function (result) {
                    _this.setData({
                        searchResult: result,
                        inputVal: e.detail.value
                    });
                });
            }
        }, 500);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUE0QztBQUc1QyxrREFBOEM7QUFLOUMsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsSUFBSSxFQUFhLEVBQUU7UUFDbkIsT0FBTyxFQUFZLEVBQUU7UUFDckIsS0FBSyxFQUFVLEVBQUU7UUFDakIsT0FBTyxFQUFXLEVBQUU7UUFDcEIsU0FBUyxFQUFXLEVBQUU7UUFDdEIsVUFBVSxFQUFZLEVBQUU7UUFDeEIsVUFBVSxFQUFFLENBQUM7UUFDYixRQUFRLEVBQUUsQ0FBQztRQUNYLFdBQVcsRUFBRSxDQUFDO1FBQ2QsYUFBYSxFQUFFLENBQUM7UUFDaEIsSUFBSSxFQUFFLENBQUM7UUFDUCxXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBVSxFQUFFO0tBQzNCO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0MsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTlDLE9BQU8sR0FBRyxTQUFvQzt3QkFDOUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxP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QVUsQ0FBQztZQUNQLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLEVBQUU7Z0JBQ3JELEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07b0JBQ2hELEtBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1QsWUFBWSxFQUFFLE1BQU07d0JBQ3BCLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7cUJBQzNCLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2NhdGFsb2cvY2F0YWxvZy5qc1xuaW1wb3J0IHtJdGVtQXBpfSBmcm9tICcuLi8uLi9hcGlzL2l0ZW0tYXBpJztcbmltcG9ydCB7SXRlbVRhZ30gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvaXRlbS10YWcnO1xuaW1wb3J0IHtJdGVtfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9pdGVtJztcbmltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7Q2xhc3N9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2NsYXNzJztcbmltcG9ydCB7V3hCaW5kRXZlbnR9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3d4LWJpbmQtZXZlbnQnO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGl0ZW1BcGk6IDxJdGVtQXBpPnt9LFxuICAgICAgICBjbGFzc0FwaTogPENsYXNzQXBpPnt9LFxuICAgICAgICB0YWdzOiA8SXRlbVRhZ1tdPltdLFxuICAgICAgICB0YWdzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIGl0ZW1zOiA8SXRlbVtdPltdLFxuICAgICAgICBjbGFzc2VzOiA8Q2xhc3NbXT5bXSxcbiAgICAgICAgY2xhc3NUcmVlOiA8R3JhZGVbXT5bXSxcbiAgICAgICAgY2xhc3Nlc0FycjogPHN0cmluZ1tdPltdLFxuICAgICAgICBjbGFzc0luZGV4OiAwLFxuICAgICAgICB0YWdJbmRleDogMCxcbiAgICAgICAgZmlsdGVyVGFnSWQ6IDAsXG4gICAgICAgIGZpbHRlckNsYXNzSWQ6IDAsXG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIHNlYXJjaFRpbWVyOiAwLFxuICAgICAgICBzZWFyY2hSZXN1bHQ6IDxJdGVtW10+W11cbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGl0ZW1BcGk6IG5ldyBJdGVtQXBpKCksXG4gICAgICAgICAgICBjbGFzc0FwaTogbmV3IENsYXNzQXBpKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICAgIHRoaXMuZ2V0QmFzZURhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXRlbXNRdWVyeSgxKTtcbiAgICB9LFxuICAgIGFzeW5jIGdldEJhc2VEYXRhKCkge1xuICAgICAgICBsZXQgY2xhc3NlcyA9IGF3YWl0IHRoaXMuZGF0YS5jbGFzc0FwaS5jbGFzc0xpc3QoKTtcbiAgICAgICAgbGV0IGNsYXNzZXNBcnIgPSBbJ+WFqOmDqCddO1xuICAgICAgICBjbGFzc2VzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBjbGFzc2VzQXJyLnB1c2goYy5ncmFkZU5hbWUgKyAnICcgKyBjLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHRhZ3MgPSBhd2FpdCB0aGlzLmRhdGEuaXRlbUFwaS5nZXRUYWdzKCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICAgICAgY2xhc3Nlc0FycjogY2xhc3Nlc0FycixcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3MsXG4gICAgICAgICAgICB0YWdzQXJyOiBbJ+WFqOmDqCddLmNvbmNhdCh0YWdzLm1hcChpID0+IGkubmFtZSkpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaXRlbXNRdWVyeShwYWdlPzogbnVtYmVyKSB7XG4gICAgICAgIHBhZ2UgPSBwYWdlIHx8IHRoaXMuZGF0YS5wYWdlO1xuICAgICAgICBsZXQgdGFnSWQgPSB0aGlzLmRhdGEuZmlsdGVyVGFnSWQ7XG4gICAgICAgIGxldCBjbGFzc0lkID0gdGhpcy5kYXRhLmZpbHRlckNsYXNzSWQ7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLnF1ZXJ5KHBhZ2UsIDIwLCB0YWdJZCwgY2xhc3NJZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5kYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5saXN0ICYmIHJlc3VsdC5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChyZXN1bHQubGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyxcbiAgICAgICAgICAgICAgICBwYWdlOiByZXN1bHQucGFnaW5hdGlvbi5wYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kVGFnRmlsdGVyQ2hhbmdlKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWU7XG5cbiAgICAgICAgbGV0IHRhZ0lkID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGFnSWQgPSB0aGlzLmRhdGEudGFnc1tpbmRleCAtIDFdLmlkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5kYXRhLnRhZ0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHRhZ0luZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICBmaWx0ZXJUYWdJZDogdGFnSWQsXG4gICAgICAgICAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiaW5kQ2xhc3NGaWx0ZXJDaGFuZ2UoZTogV3hCaW5kRXZlbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgbGV0IGNsYXNzSWQgPSAwO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBjbGFzc0lkID0gdGhpcy5kYXRhLmNsYXNzZXNbaW5kZXggLSAxXS5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggIT09IHRoaXMuZGF0YS5jbGFzc0luZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGNsYXNzSW5kZXg6IGUuZGV0YWlsLnZhbHVlLFxuICAgICAgICAgICAgICAgIGZpbHRlckNsYXNzSWQ6IGNsYXNzSWQsXG4gICAgICAgICAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgICAgICAgICAgcGFnZTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b0xvYW4oZTogV3hCaW5kRXZlbnQpIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAvcGFnZXMvaXRlbS9sb2FuL2xvYW4/aWQ9JHtlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtSWR9YFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldE1vcmUoZTogV3hCaW5kRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHRoaXMuaXRlbXNRdWVyeSh0aGlzLmRhdGEucGFnZSArIDEpO1xuICAgIH0sXG4gICAgc2hvd0lucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaW5wdXRTaG93ZWQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoaWRlSW5wdXQoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBpbnB1dFZhbDogJycsXG4gICAgICAgICAgICBpbnB1dFNob3dlZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjbGVhcklucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaW5wdXRWYWw6ICcnXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaW5wdXRUeXBpbmcoZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzZWFyY2hUaW1lcjogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5kYXRhLnNlYXJjaFRpbWVyID49IDUwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLnNlYXJjaChlLmRldGFpbC52YWx1ZSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbDogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSxcbn0pO1xuIl19