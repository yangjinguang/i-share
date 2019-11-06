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
var item_api_1 = require("../../../apis/item-api");
var upload_image_item_1 = require("../../../utils/types/upload-image-item");
var settings_api_1 = require("../../../apis/settings-api");
var class_api_1 = require("../../../apis/class-api");
Page({
    data: {
        itemApi: {},
        settingsApi: {},
        classApi: {},
        item: {},
        upToken: '',
        types: ['图书', '玩具'],
        typeIndex: 0,
        tags: [],
        tagArr: [],
        tagIndex: 0,
        title: '',
        describe: '',
        selectedTags: [],
        selectedCover: {},
        isNew: true,
        classTree: [],
        classArr: [],
        classIndex: [],
    },
    onLoad: function (query) {
        var _this = this;
        var id = query['id'];
        this.setData({
            itemApi: new item_api_1.ItemApi(),
            settingsApi: new settings_api_1.SettingsApi(),
            classApi: new class_api_1.ClassApi()
        });
        this.getBaseData().then(function () {
            if (id) {
                _this.getItem(id);
            }
        });
    },
    getItem: function (id) {
        var _this = this;
        this.data.itemApi.getOne(id).then(function (result) {
            var selectedTags = [];
            if (result.tags) {
                selectedTags = result.tags;
            }
            var selectedCover = {};
            if (result.coverUrl) {
                var arr = result.coverUrl.split('/');
                selectedCover = {
                    tempPath: result.coverUrl,
                    completed: true,
                    success: true,
                    fileName: arr[arr.length - 1]
                };
            }
            var classTree = _this.data.classTree;
            var iClass = result.iClass || {};
            var gradeI = classTree.findIndex(function (i) { return i.id === iClass.gradeId; });
            var classI = classTree[gradeI].classes.findIndex(function (i) { return i.id == iClass.id; });
            var classIndex = [gradeI, classI];
            _this.setData({
                item: result,
                typeIndex: result.type,
                title: result.title,
                desc: result.desc,
                selectedTags: selectedTags,
                selectedCover: selectedCover,
                isNew: false,
                classIndex: classIndex
            });
        });
    },
    getBaseData: function () {
        return __awaiter(this, void 0, void 0, function () {
            var tags, classTree, uploadToke, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data.itemApi.getTags()];
                    case 1:
                        tags = _a.sent();
                        return [4, this.data.classApi.classTree()];
                    case 2:
                        classTree = _a.sent();
                        return [4, this.data.settingsApi.uploadToken()];
                    case 3:
                        uploadToke = _a.sent();
                        arr = [];
                        arr[0] = classTree.map(function (i) { return i.name; });
                        arr[1] = classTree[0].classes ? classTree[0].classes.map(function (i) { return i.name; }) : [];
                        this.setData({
                            classTree: classTree,
                            classArr: arr,
                            tags: tags,
                            tagArr: tags.map(function (i) { return i.name; }),
                            upToken: uploadToke
                        });
                        return [2];
                }
            });
        });
    },
    bindTypeChange: function (e) {
        this.setData({
            typeIndex: e.detail.value
        });
    },
    bindTagsChange: function (e) {
        var selectedTags = this.data.selectedTags;
        var curIndex = parseInt(e.detail.value);
        var tag = this.data.tags[curIndex];
        if (!selectedTags.find(function (i) { return i.id === tag.id; })) {
            selectedTags.push(tag);
        }
        this.setData({
            selectedTags: selectedTags
        });
        console.log(this.data.selectedTags);
    },
    deleteTag: function (e) {
        var tagIndex = e.currentTarget.dataset.tagIndex;
        console.log(tagIndex);
        var selectedTags = this.data.selectedTags;
        selectedTags.splice(tagIndex, 1);
        this.setData({
            selectedTags: selectedTags
        });
    },
    chooseImage: function () {
        var _this = this;
        wx.chooseImage({
            success: function (res) {
                var fileItem = new upload_image_item_1.UploadImageItemObj(_this.data.upToken, res.tempFilePaths[0], 'item_cover', function (item) {
                    _this.setData({
                        selectedCover: item
                    });
                });
                fileItem.upload();
                _this.setData({
                    selectedCover: fileItem
                });
            }
        });
    },
    clearForm: function () {
        this.setData({});
    },
    bindClassColumnChange: function (e) {
        if (e.detail['column'] === 0) {
            var gradeIndex = parseInt(e.detail.value);
            var classTree = this.data.classTree;
            this.setData({
                classArr: [
                    this.data.classArr[0],
                    classTree[gradeIndex].classes.map(function (i) { return i.name; })
                ]
            });
        }
    },
    bindClassChange: function (e) {
        var classIndex = e.detail.value;
        this.setData({
            classIndex: classIndex
        });
    },
    formSubmit: function (e) {
        var _this = this;
        var classTree = this.data.classTree;
        var formValue = e.detail.value;
        var tags = [];
        this.data.selectedTags.forEach(function (i) {
            tags.push(i.id);
        });
        var newItem = {
            title: formValue['title'],
            type: formValue['type'],
            tagIds: tags,
            coverUrl: this.data.selectedCover.fileName,
            desc: formValue['desc']
        };
        if (formValue['class'] && formValue['class'].length > 0) {
            newItem.classId = classTree[formValue['class'][0]].classes[formValue['class'][1]].id;
        }
        else {
            return;
        }
        console.log(newItem);
        if (this.data.isNew) {
            this.data.itemApi.create(newItem).then(function () {
                wx.showModal({
                    title: '上传成功',
                    content: '是否继续上传?',
                    confirmText: '确定',
                    cancelText: '返回',
                    success: function (res) {
                        if (res.confirm) {
                            _this.setData({
                                title: '',
                                describe: '',
                                typeIndex: 0,
                                selectedCover: {},
                                selectedTags: [],
                            });
                        }
                        else {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    }
                });
            });
        }
        else {
            if (this.data.item.id) {
                this.data.itemApi.update(this.data.item.id, newItem).then(function () {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBK0M7QUFHL0MsNEVBQTJGO0FBQzNGLDJEQUF1RDtBQUV2RCxxREFBaUQ7QUFHakQsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsV0FBVyxFQUFlLEVBQUU7UUFDNUIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsSUFBSSxFQUFRLEVBQUU7UUFDZCxPQUFPLEVBQUUsRUFBRTtRQUNYLEtBQUssRUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDN0IsU0FBUyxFQUFFLENBQUM7UUFDWixJQUFJLEVBQWEsRUFBRTtRQUNuQixNQUFNLEVBQVksRUFBRTtRQUNwQixRQUFRLEVBQUUsQ0FBQztRQUNYLEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEVBQUU7UUFDWixZQUFZLEVBQWEsRUFBRTtRQUMzQixhQUFhLEVBQW1CLEVBQUU7UUFDbEMsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQVcsRUFBRTtRQUN0QixRQUFRLEVBQVMsRUFBRTtRQUNuQixVQUFVLEVBQVksRUFBRTtLQUMzQjtJQUNELE1BQU0sRUFBTixVQUFPLEtBQVU7UUFBakIsaUJBWUM7UUFYRyxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7WUFDdEIsV0FBVyxFQUFFLElBQUksMEJBQVcsRUFBRTtZQUM5QixRQUFRLEVBQUUsSUFBSSxvQkFBUSxFQUFFO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osS0FB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QUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3RELEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ1osS0FBSyxFQUFFLENBQUM7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0l0ZW1BcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvaXRlbS1hcGknO1xuaW1wb3J0IHtJdGVtfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pdGVtJztcbmltcG9ydCB7SXRlbVRhZ30gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvaXRlbS10YWcnO1xuaW1wb3J0IHtVcGxvYWRJbWFnZUl0ZW0sIFVwbG9hZEltYWdlSXRlbU9ian0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvdXBsb2FkLWltYWdlLWl0ZW0nO1xuaW1wb3J0IHtTZXR0aW5nc0FwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9zZXR0aW5ncy1hcGknO1xuaW1wb3J0IHtHcmFkZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvZ3JhZGUnO1xuaW1wb3J0IHtDbGFzc0FwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9jbGFzcy1hcGknO1xuaW1wb3J0IHtDbGFzc30gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvY2xhc3MnO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIGl0ZW1BcGk6IDxJdGVtQXBpPnt9LFxuICAgICAgICBzZXR0aW5nc0FwaTogPFNldHRpbmdzQXBpPnt9LFxuICAgICAgICBjbGFzc0FwaTogPENsYXNzQXBpPnt9LFxuICAgICAgICBpdGVtOiA8SXRlbT57fSxcbiAgICAgICAgdXBUb2tlbjogJycsXG4gICAgICAgIHR5cGVzOiA8c3RyaW5nW10+Wyflm77kuaYnLCAn546p5YW3J10sXG4gICAgICAgIHR5cGVJbmRleDogMCxcbiAgICAgICAgdGFnczogPEl0ZW1UYWdbXT5bXSxcbiAgICAgICAgdGFnQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIHRhZ0luZGV4OiAwLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRlc2NyaWJlOiAnJyxcbiAgICAgICAgc2VsZWN0ZWRUYWdzOiA8SXRlbVRhZ1tdPltdLFxuICAgICAgICBzZWxlY3RlZENvdmVyOiA8VXBsb2FkSW1hZ2VJdGVtPnt9LFxuICAgICAgICBpc05ldzogdHJ1ZSxcbiAgICAgICAgY2xhc3NUcmVlOiA8R3JhZGVbXT5bXSxcbiAgICAgICAgY2xhc3NBcnI6IDxhbnlbXT5bXSxcbiAgICAgICAgY2xhc3NJbmRleDogPG51bWJlcltdPltdLFxuICAgIH0sXG4gICAgb25Mb2FkKHF1ZXJ5OiBhbnkpIHtcbiAgICAgICAgY29uc3QgaWQgPSBxdWVyeVsnaWQnXTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGl0ZW1BcGk6IG5ldyBJdGVtQXBpKCksXG4gICAgICAgICAgICBzZXR0aW5nc0FwaTogbmV3IFNldHRpbmdzQXBpKCksXG4gICAgICAgICAgICBjbGFzc0FwaTogbmV3IENsYXNzQXBpKClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0QmFzZURhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SXRlbShpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLmdldE9uZShpZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFncyA9IDxJdGVtVGFnW10+W107XG4gICAgICAgICAgICBpZiAocmVzdWx0LnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhZ3MgPSByZXN1bHQudGFncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZENvdmVyID0gPFVwbG9hZEltYWdlSXRlbT57fTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuY292ZXJVcmwpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gcmVzdWx0LmNvdmVyVXJsLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3ZlciA9IDxVcGxvYWRJbWFnZUl0ZW0+e1xuICAgICAgICAgICAgICAgICAgICB0ZW1wUGF0aDogcmVzdWx0LmNvdmVyVXJsLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBhcnJbYXJyLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzVHJlZSA9IHRoaXMuZGF0YS5jbGFzc1RyZWU7XG4gICAgICAgICAgICBjb25zdCBpQ2xhc3MgPSByZXN1bHQuaUNsYXNzIHx8IDxDbGFzcz57fTtcbiAgICAgICAgICAgIGxldCBncmFkZUkgPSBjbGFzc1RyZWUuZmluZEluZGV4KGkgPT4gaS5pZCA9PT0gaUNsYXNzLmdyYWRlSWQpO1xuICAgICAgICAgICAgbGV0IGNsYXNzSSA9IGNsYXNzVHJlZVtncmFkZUldLmNsYXNzZXMuZmluZEluZGV4KGkgPT4gaS5pZCA9PSBpQ2xhc3MuaWQpO1xuICAgICAgICAgICAgbGV0IGNsYXNzSW5kZXggPSA8bnVtYmVyW10+W2dyYWRlSSwgY2xhc3NJXTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgaXRlbTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIHR5cGVJbmRleDogcmVzdWx0LnR5cGUsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlc3VsdC50aXRsZSxcbiAgICAgICAgICAgICAgICBkZXNjOiByZXN1bHQuZGVzYyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhZ3M6IHNlbGVjdGVkVGFncyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvdmVyOiBzZWxlY3RlZENvdmVyLFxuICAgICAgICAgICAgICAgIGlzTmV3OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjbGFzc0luZGV4OiBjbGFzc0luZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRCYXNlRGF0YSgpIHtcbiAgICAgICAgbGV0IHRhZ3MgPSBhd2FpdCB0aGlzLmRhdGEuaXRlbUFwaS5nZXRUYWdzKCk7XG4gICAgICAgIGxldCBjbGFzc1RyZWUgPSBhd2FpdCB0aGlzLmRhdGEuY2xhc3NBcGkuY2xhc3NUcmVlKCk7XG4gICAgICAgIGxldCB1cGxvYWRUb2tlID0gYXdhaXQgdGhpcy5kYXRhLnNldHRpbmdzQXBpLnVwbG9hZFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBhcnJbMF0gPSBjbGFzc1RyZWUubWFwKGkgPT4gaS5uYW1lKTtcbiAgICAgICAgYXJyWzFdID0gY2xhc3NUcmVlWzBdLmNsYXNzZXMgPyBjbGFzc1RyZWVbMF0uY2xhc3Nlcy5tYXAoaSA9PiBpLm5hbWUpIDogW107XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBjbGFzc1RyZWU6IGNsYXNzVHJlZSxcbiAgICAgICAgICAgIGNsYXNzQXJyOiBhcnIsXG4gICAgICAgICAgICB0YWdzOiB0YWdzLFxuICAgICAgICAgICAgdGFnQXJyOiB0YWdzLm1hcChpID0+IGkubmFtZSksXG4gICAgICAgICAgICB1cFRva2VuOiB1cGxvYWRUb2tlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZFR5cGVDaGFuZ2UoZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB0eXBlSW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmluZFRhZ3NDaGFuZ2UoZTogYW55KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGFncyA9IHRoaXMuZGF0YS5zZWxlY3RlZFRhZ3M7XG4gICAgICAgIGNvbnN0IGN1ckluZGV4ID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUpO1xuICAgICAgICBjb25zdCB0YWcgPSB0aGlzLmRhdGEudGFnc1tjdXJJbmRleF07XG4gICAgICAgIGlmICghc2VsZWN0ZWRUYWdzLmZpbmQoaSA9PiBpLmlkID09PSB0YWcuaWQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRhZ3MucHVzaCh0YWcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzZWxlY3RlZFRhZ3M6IHNlbGVjdGVkVGFnc1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnNlbGVjdGVkVGFncyk7XG4gICAgfSxcbiAgICBkZWxldGVUYWcoZTogYW55KSB7XG4gICAgICAgIGxldCB0YWdJbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhZ0luZGV4O1xuICAgICAgICBjb25zb2xlLmxvZyh0YWdJbmRleCk7XG4gICAgICAgIGxldCBzZWxlY3RlZFRhZ3MgPSB0aGlzLmRhdGEuc2VsZWN0ZWRUYWdzO1xuICAgICAgICBzZWxlY3RlZFRhZ3Muc3BsaWNlKHRhZ0luZGV4LCAxKTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGFnczogc2VsZWN0ZWRUYWdzXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2hvb3NlSW1hZ2UoKSB7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlSXRlbSA9IG5ldyBVcGxvYWRJbWFnZUl0ZW1PYmoodGhpcy5kYXRhLnVwVG9rZW4sIHJlcy50ZW1wRmlsZVBhdGhzWzBdLCAnaXRlbV9jb3ZlcicsIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvdmVyOiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZpbGVJdGVtLnVwbG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ292ZXI6IGZpbGVJdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgY2xlYXJGb3JtKCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe30pO1xuICAgIH0sXG4gICAgYmluZENsYXNzQ29sdW1uQ2hhbmdlKGU6IGFueSkge1xuICAgICAgICBpZiAoZS5kZXRhaWxbJ2NvbHVtbiddID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBncmFkZUluZGV4ID0gcGFyc2VJbnQoZS5kZXRhaWwudmFsdWUpO1xuICAgICAgICAgICAgbGV0IGNsYXNzVHJlZSA9IHRoaXMuZGF0YS5jbGFzc1RyZWUgYXMgQXJyYXk8R3JhZGU+O1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBjbGFzc0FycjogW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuY2xhc3NBcnJbMF0sXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzVHJlZVtncmFkZUluZGV4XS5jbGFzc2VzLm1hcChpID0+IGkubmFtZSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBiaW5kQ2xhc3NDaGFuZ2UoZTogYW55KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzSW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNsYXNzSW5kZXg6IGNsYXNzSW5kZXhcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBmb3JtU3VibWl0KGU6IGFueSkge1xuICAgICAgICBsZXQgY2xhc3NUcmVlID0gdGhpcy5kYXRhLmNsYXNzVHJlZSBhcyBBcnJheTxHcmFkZT47XG4gICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICBjb25zdCB0YWdzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWRUYWdzLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICB0YWdzLnB1c2goaS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gPEl0ZW0+e1xuICAgICAgICAgICAgdGl0bGU6IGZvcm1WYWx1ZVsndGl0bGUnXSxcbiAgICAgICAgICAgIHR5cGU6IGZvcm1WYWx1ZVsndHlwZSddLFxuICAgICAgICAgICAgdGFnSWRzOiB0YWdzLFxuICAgICAgICAgICAgY292ZXJVcmw6IHRoaXMuZGF0YS5zZWxlY3RlZENvdmVyLmZpbGVOYW1lLFxuICAgICAgICAgICAgZGVzYzogZm9ybVZhbHVlWydkZXNjJ11cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGZvcm1WYWx1ZVsnY2xhc3MnXSAmJiBmb3JtVmFsdWVbJ2NsYXNzJ10ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbmV3SXRlbS5jbGFzc0lkID0gY2xhc3NUcmVlW2Zvcm1WYWx1ZVsnY2xhc3MnXVswXV0uY2xhc3Nlc1tmb3JtVmFsdWVbJ2NsYXNzJ11bMV1dLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKG5ld0l0ZW0pO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmlzTmV3KSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS5jcmVhdGUobmV3SXRlbSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5piv5ZCm57un57ut5LiK5LygPycsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+i/lOWbnicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpYmU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ292ZXI6IDxVcGxvYWRJbWFnZUl0ZW0+e30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFnczogW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5pdGVtLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkudXBkYXRlKHRoaXMuZGF0YS5pdGVtLmlkLCBuZXdJdGVtKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=