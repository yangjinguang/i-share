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
            var items = [];
            if (page && page > 1) {
                items = _this.data.items;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUE0QztBQUc1QyxrREFBOEM7QUFLOUMsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsSUFBSSxFQUFhLEVBQUU7UUFDbkIsT0FBTyxFQUFZLEVBQUU7UUFDckIsS0FBSyxFQUFVLEVBQUU7UUFDakIsT0FBTyxFQUFXLEVBQUU7UUFDcEIsU0FBUyxFQUFXLEVBQUU7UUFDdEIsVUFBVSxFQUFZLEVBQUU7UUFDeEIsVUFBVSxFQUFFLENBQUM7UUFDYixRQUFRLEVBQUUsQ0FBQztRQUNYLFdBQVcsRUFBRSxDQUFDO1FBQ2QsYUFBYSxFQUFFLENBQUM7UUFDaEIsSUFBSSxFQUFFLENBQUM7UUFDUCxXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBVSxFQUFFO0tBQzNCO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0MsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQTlDLE9BQU8sR0FBRyxTQUFvQzt3QkFDOUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxP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VCxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDO1lBQ1AsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsRUFBRTtnQkFDckQsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtvQkFDaEQsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDVCxZQUFZLEVBQUUsTUFBTTt3QkFDcEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztxQkFDM0IsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvY2F0YWxvZy9jYXRhbG9nLmpzXG5pbXBvcnQge0l0ZW1BcGl9IGZyb20gJy4uLy4uL2FwaXMvaXRlbS1hcGknO1xuaW1wb3J0IHtJdGVtVGFnfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9pdGVtLXRhZyc7XG5pbXBvcnQge0l0ZW19IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2l0ZW0nO1xuaW1wb3J0IHtDbGFzc0FwaX0gZnJvbSAnLi4vLi4vYXBpcy9jbGFzcy1hcGknO1xuaW1wb3J0IHtHcmFkZX0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvZ3JhZGUnO1xuaW1wb3J0IHtDbGFzc30gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvY2xhc3MnO1xuaW1wb3J0IHtXeEJpbmRFdmVudH0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvd3gtYmluZC1ldmVudCc7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgaXRlbUFwaTogPEl0ZW1BcGk+e30sXG4gICAgICAgIGNsYXNzQXBpOiA8Q2xhc3NBcGk+e30sXG4gICAgICAgIHRhZ3M6IDxJdGVtVGFnW10+W10sXG4gICAgICAgIHRhZ3NBcnI6IDxzdHJpbmdbXT5bXSxcbiAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgIGNsYXNzZXM6IDxDbGFzc1tdPltdLFxuICAgICAgICBjbGFzc1RyZWU6IDxHcmFkZVtdPltdLFxuICAgICAgICBjbGFzc2VzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIGNsYXNzSW5kZXg6IDAsXG4gICAgICAgIHRhZ0luZGV4OiAwLFxuICAgICAgICBmaWx0ZXJUYWdJZDogMCxcbiAgICAgICAgZmlsdGVyQ2xhc3NJZDogMCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgc2VhcmNoVGltZXI6IDAsXG4gICAgICAgIHNlYXJjaFJlc3VsdDogPEl0ZW1bXT5bXVxuICAgIH0sXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaXRlbUFwaTogbmV3IEl0ZW1BcGkoKSxcbiAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uU2hvdygpIHtcbiAgICAgICAgdGhpcy5nZXRCYXNlRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pdGVtc1F1ZXJ5KDEpO1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0QmFzZURhdGEoKSB7XG4gICAgICAgIGxldCBjbGFzc2VzID0gYXdhaXQgdGhpcy5kYXRhLmNsYXNzQXBpLmNsYXNzTGlzdCgpO1xuICAgICAgICBsZXQgY2xhc3Nlc0FyciA9IFsn5YWo6YOoJ107XG4gICAgICAgIGNsYXNzZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGNsYXNzZXNBcnIucHVzaChjLmdyYWRlTmFtZSArICcgJyArIGMubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgdGFncyA9IGF3YWl0IHRoaXMuZGF0YS5pdGVtQXBpLmdldFRhZ3MoKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgICAgICBjbGFzc2VzQXJyOiBjbGFzc2VzQXJyLFxuICAgICAgICAgICAgdGFnczogdGFncyxcbiAgICAgICAgICAgIHRhZ3NBcnI6IFsn5YWo6YOoJ10uY29uY2F0KHRhZ3MubWFwKGkgPT4gaS5uYW1lKSlcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpdGVtc1F1ZXJ5KHBhZ2U/OiBudW1iZXIpIHtcbiAgICAgICAgcGFnZSA9IHBhZ2UgfHwgdGhpcy5kYXRhLnBhZ2U7XG4gICAgICAgIGxldCB0YWdJZCA9IHRoaXMuZGF0YS5maWx0ZXJUYWdJZDtcbiAgICAgICAgbGV0IGNsYXNzSWQgPSB0aGlzLmRhdGEuZmlsdGVyQ2xhc3NJZDtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkucXVlcnkocGFnZSwgMjAsIHRhZ0lkLCBjbGFzc0lkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSA8SXRlbVtdPltdO1xuICAgICAgICAgICAgaWYgKHBhZ2UgJiYgcGFnZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcyA9IHRoaXMuZGF0YS5pdGVtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQubGlzdCAmJiByZXN1bHQubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQocmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpdGVtczogaXRlbXMsXG4gICAgICAgICAgICAgICAgcGFnZTogcmVzdWx0LnBhZ2luYXRpb24ucGFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZFRhZ0ZpbHRlckNoYW5nZShlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xuXG4gICAgICAgIGxldCB0YWdJZCA9IDA7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRhZ0lkID0gdGhpcy5kYXRhLnRhZ3NbaW5kZXggLSAxXS5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggIT09IHRoaXMuZGF0YS50YWdJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB0YWdJbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgZmlsdGVyVGFnSWQ6IHRhZ0lkLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiA8SXRlbVtdPltdLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1F1ZXJ5KHRoaXMuZGF0YS5wYWdlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmluZENsYXNzRmlsdGVyQ2hhbmdlKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIGxldCBjbGFzc0lkID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgY2xhc3NJZCA9IHRoaXMuZGF0YS5jbGFzc2VzW2luZGV4IC0gMV0uaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLmRhdGEuY2xhc3NJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBjbGFzc0luZGV4OiBlLmRldGFpbC52YWx1ZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJDbGFzc0lkOiBjbGFzc0lkLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiA8SXRlbVtdPltdLFxuICAgICAgICAgICAgICAgIHBhZ2U6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1F1ZXJ5KHRoaXMuZGF0YS5wYWdlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdG9Mb2FuKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2l0ZW0vbG9hbi9sb2FuP2lkPSR7ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbUlkfWBcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNb3JlKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB0aGlzLml0ZW1zUXVlcnkodGhpcy5kYXRhLnBhZ2UgKyAxKTtcbiAgICB9LFxuICAgIHNob3dJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGlucHV0U2hvd2VkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGlkZUlucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaW5wdXRWYWw6ICcnLFxuICAgICAgICAgICAgaW5wdXRTaG93ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xlYXJJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGlucHV0VmFsOiAnJ1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGlucHV0VHlwaW5nKGU6IGFueSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2VhcmNoVGltZXI6IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuZGF0YS5zZWFyY2hUaW1lciA+PSA1MDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS5zZWFyY2goZS5kZXRhaWwudmFsdWUpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWw6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA1MDApO1xuICAgIH0sXG59KTtcbiJdfQ==