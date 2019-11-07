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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBK0M7QUFHL0MsNEVBQTJGO0FBQzNGLDJEQUF1RDtBQUV2RCxxREFBaUQ7QUFHakQsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsV0FBVyxFQUFlLEVBQUU7UUFDNUIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsSUFBSSxFQUFRLEVBQUU7UUFDZCxPQUFPLEVBQUUsRUFBRTtRQUNYLEtBQUssRUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDN0IsU0FBUyxFQUFFLENBQUM7UUFDWixJQUFJLEVBQWEsRUFBRTtRQUNuQixNQUFNLEVBQVksRUFBRTtRQUNwQixRQUFRLEVBQUUsQ0FBQztRQUNYLEtBQUssRUFBRSxFQUFFO1FBQ1QsUUFBUSxFQUFFLEVBQUU7UUFDWixZQUFZLEVBQWEsRUFBRTtRQUMzQixhQUFhLEVBQW1CLEVBQUU7UUFDbEMsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQVcsRUFBRTtRQUN0QixRQUFRLEVBQVMsRUFBRTtRQUNuQixVQUFVLEVBQVksRUFBRTtLQUMzQjtJQUNELE1BQU0sWUFBQyxLQUFVO1FBQWpCLGlCQVlDO1FBWEcsSUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSSxrQkFBTyxFQUFFO1lBQ3RCLFdBQVcsRUFBRSxJQUFJLDBCQUFXLEVBQUU7WUFDOUIsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksRUFBRSxFQUFFO2dCQUNKLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxPQUFPLFlBQUMsRUFBVTtRQUFsQixpQkFnQ0M7UUEvQkcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDcEMsSUFBSSxZQUFZLEdBQWMsRUFBRSxDQUFDO1lBQ2pDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDYixZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzthQUM5QjtZQUNELElBQUksYUFBYSxHQUFvQixFQUFFLENBQUM7WUFDeEMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsYUFBYSxHQUFvQjtvQkFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO29CQUN6QixTQUFTLEVBQUUsSUFBSTtvQkFDZixPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQyxDQUFDO2FBQ0w7WUFDRCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN0QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFXLEVBQUUsQ0FBQztZQUMxQyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsT0FBTyxFQUF2QixDQUF1QixDQUFDLENBQUM7WUFDL0QsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztZQUN6RSxJQUFJLFVBQVUsR0FBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1QyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDdEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dCQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLFlBQVksRUFBRSxZQUFZO2dCQUMxQixhQUFhLEVBQUUsYUFBYTtnQkFDNUIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7YUFDekIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0YsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXhDLElBQUksR0FBRyxTQUFpQzt3QkFDNUIsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWhELFNBQVMsR0FBRyxTQUFvQzt3QkFDbkMsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQXRELFVBQVUsR0FBRyxTQUF5Qzt3QkFDcEQsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUM7d0JBQ3BDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDVCxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsSUFBSSxFQUFFLElBQUk7NEJBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQzs0QkFDN0IsT0FBTyxFQUFFLFVBQVU7eUJBQ3RCLENBQUMsQ0FBQzs7Ozs7S0FDTjtJQUNELGNBQWMsWUFBQyxDQUFNO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQzVCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxjQUFjLFlBQUMsQ0FBTTtRQUNqQixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM1QyxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBZixDQUFlLENBQUMsRUFBRTtZQUMxQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFlBQVksRUFBRSxZQUFZO1NBQzdCLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsU0FBUyxZQUFDLENBQU07UUFDWixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsWUFBWSxFQUFFLFlBQVk7U0FDN0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFdBQVc7UUFBWCxpQkFjQztRQWJHLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDWCxPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQU0sUUFBUSxHQUFHLElBQUksc0NBQWtCLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNoRyxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULGFBQWEsRUFBRSxJQUFJO3FCQUN0QixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNULGFBQWEsRUFBRSxRQUFRO2lCQUMxQixDQUFDLENBQUM7WUFDUCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFNBQVM7UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxxQkFBcUIsWUFBQyxDQUFNO1FBQ3hCLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUF5QixDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsUUFBUSxFQUFFO29CQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDckIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQztpQkFDakQ7YUFDSixDQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7SUFDRCxlQUFlLFlBQUMsQ0FBTTtRQUNsQixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsVUFBVSxFQUFFLFVBQVU7U0FDekIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFVBQVUsWUFBQyxDQUFNO1FBQWpCLGlCQXFEQztRQXBERyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQXlCLENBQUM7UUFDcEQsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakMsSUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFNLE9BQU8sR0FBUztZQUNsQixLQUFLLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUN2QixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQzFDLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDO1NBQzFCLENBQUM7UUFDRixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyRCxPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3hGO2FBQU07WUFDSCxPQUFPO1NBQ1Y7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkMsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsU0FBUztvQkFDbEIsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsVUFBQyxHQUFHO3dCQUNULElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDYixLQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULEtBQUssRUFBRSxFQUFFO2dDQUNULFFBQVEsRUFBRSxFQUFFO2dDQUNaLFNBQVMsRUFBRSxDQUFDO2dDQUNaLGFBQWEsRUFBbUIsRUFBRTtnQ0FDbEMsWUFBWSxFQUFFLEVBQUU7NkJBQ25CLENBQUMsQ0FBQzt5QkFDTjs2QkFBTTs0QkFDSCxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUNaLEtBQUssRUFBRSxDQUFDOzZCQUNYLENBQUMsQ0FBQzt5QkFDTjtvQkFDTCxDQUFDO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEQsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDWixLQUFLLEVBQUUsQ0FBQztxQkFDWCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlbUFwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9pdGVtLWFwaSc7XG5pbXBvcnQge0l0ZW19IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzL2l0ZW0nO1xuaW1wb3J0IHtJdGVtVGFnfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pdGVtLXRhZyc7XG5pbXBvcnQge1VwbG9hZEltYWdlSXRlbSwgVXBsb2FkSW1hZ2VJdGVtT2JqfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy91cGxvYWQtaW1hZ2UtaXRlbSc7XG5pbXBvcnQge1NldHRpbmdzQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL3NldHRpbmdzLWFwaSc7XG5pbXBvcnQge0dyYWRlfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9ncmFkZSc7XG5pbXBvcnQge0NsYXNzQXBpfSBmcm9tICcuLi8uLi8uLi9hcGlzL2NsYXNzLWFwaSc7XG5pbXBvcnQge0NsYXNzfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9jbGFzcyc7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgaXRlbUFwaTogPEl0ZW1BcGk+e30sXG4gICAgICAgIHNldHRpbmdzQXBpOiA8U2V0dGluZ3NBcGk+e30sXG4gICAgICAgIGNsYXNzQXBpOiA8Q2xhc3NBcGk+e30sXG4gICAgICAgIGl0ZW06IDxJdGVtPnt9LFxuICAgICAgICB1cFRva2VuOiAnJyxcbiAgICAgICAgdHlwZXM6IDxzdHJpbmdbXT5bJ+WbvuS5picsICfnjqnlhbcnXSxcbiAgICAgICAgdHlwZUluZGV4OiAwLFxuICAgICAgICB0YWdzOiA8SXRlbVRhZ1tdPltdLFxuICAgICAgICB0YWdBcnI6IDxzdHJpbmdbXT5bXSxcbiAgICAgICAgdGFnSW5kZXg6IDAsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZGVzY3JpYmU6ICcnLFxuICAgICAgICBzZWxlY3RlZFRhZ3M6IDxJdGVtVGFnW10+W10sXG4gICAgICAgIHNlbGVjdGVkQ292ZXI6IDxVcGxvYWRJbWFnZUl0ZW0+e30sXG4gICAgICAgIGlzTmV3OiB0cnVlLFxuICAgICAgICBjbGFzc1RyZWU6IDxHcmFkZVtdPltdLFxuICAgICAgICBjbGFzc0FycjogPGFueVtdPltdLFxuICAgICAgICBjbGFzc0luZGV4OiA8bnVtYmVyW10+W10sXG4gICAgfSxcbiAgICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgICAgICBjb25zdCBpZCA9IHF1ZXJ5WydpZCddO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgaXRlbUFwaTogbmV3IEl0ZW1BcGkoKSxcbiAgICAgICAgICAgIHNldHRpbmdzQXBpOiBuZXcgU2V0dGluZ3NBcGkoKSxcbiAgICAgICAgICAgIGNsYXNzQXBpOiBuZXcgQ2xhc3NBcGkoKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nZXRCYXNlRGF0YSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRJdGVtKGlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhLml0ZW1BcGkuZ2V0T25lKGlkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWdzID0gPEl0ZW1UYWdbXT5bXTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQudGFncykge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFncyA9IHJlc3VsdC50YWdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ292ZXIgPSA8VXBsb2FkSW1hZ2VJdGVtPnt9O1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5jb3ZlclVybCkge1xuICAgICAgICAgICAgICAgIGxldCBhcnIgPSByZXN1bHQuY292ZXJVcmwuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvdmVyID0gPFVwbG9hZEltYWdlSXRlbT57XG4gICAgICAgICAgICAgICAgICAgIHRlbXBQYXRoOiByZXN1bHQuY292ZXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGFyclthcnIubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2xhc3NUcmVlID0gdGhpcy5kYXRhLmNsYXNzVHJlZTtcbiAgICAgICAgICAgIGNvbnN0IGlDbGFzcyA9IHJlc3VsdC5pQ2xhc3MgfHwgPENsYXNzPnt9O1xuICAgICAgICAgICAgbGV0IGdyYWRlSSA9IGNsYXNzVHJlZS5maW5kSW5kZXgoaSA9PiBpLmlkID09PSBpQ2xhc3MuZ3JhZGVJZCk7XG4gICAgICAgICAgICBsZXQgY2xhc3NJID0gY2xhc3NUcmVlW2dyYWRlSV0uY2xhc3Nlcy5maW5kSW5kZXgoaSA9PiBpLmlkID09IGlDbGFzcy5pZCk7XG4gICAgICAgICAgICBsZXQgY2xhc3NJbmRleCA9IDxudW1iZXJbXT5bZ3JhZGVJLCBjbGFzc0ldO1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBpdGVtOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgdHlwZUluZGV4OiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzdWx0LnRpdGxlLFxuICAgICAgICAgICAgICAgIGRlc2M6IHJlc3VsdC5kZXNjLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFnczogc2VsZWN0ZWRUYWdzLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ292ZXI6IHNlbGVjdGVkQ292ZXIsXG4gICAgICAgICAgICAgICAgaXNOZXc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsYXNzSW5kZXg6IGNsYXNzSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldEJhc2VEYXRhKCkge1xuICAgICAgICBsZXQgdGFncyA9IGF3YWl0IHRoaXMuZGF0YS5pdGVtQXBpLmdldFRhZ3MoKTtcbiAgICAgICAgbGV0IGNsYXNzVHJlZSA9IGF3YWl0IHRoaXMuZGF0YS5jbGFzc0FwaS5jbGFzc1RyZWUoKTtcbiAgICAgICAgbGV0IHVwbG9hZFRva2UgPSBhd2FpdCB0aGlzLmRhdGEuc2V0dGluZ3NBcGkudXBsb2FkVG9rZW4oKTtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGFyclswXSA9IGNsYXNzVHJlZS5tYXAoaSA9PiBpLm5hbWUpO1xuICAgICAgICBhcnJbMV0gPSBjbGFzc1RyZWVbMF0uY2xhc3NlcyA/IGNsYXNzVHJlZVswXS5jbGFzc2VzLm1hcChpID0+IGkubmFtZSkgOiBbXTtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNsYXNzVHJlZTogY2xhc3NUcmVlLFxuICAgICAgICAgICAgY2xhc3NBcnI6IGFycixcbiAgICAgICAgICAgIHRhZ3M6IHRhZ3MsXG4gICAgICAgICAgICB0YWdBcnI6IHRhZ3MubWFwKGkgPT4gaS5uYW1lKSxcbiAgICAgICAgICAgIHVwVG9rZW46IHVwbG9hZFRva2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kVHlwZUNoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHR5cGVJbmRleDogZS5kZXRhaWwudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kVGFnc0NoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYWdzID0gdGhpcy5kYXRhLnNlbGVjdGVkVGFncztcbiAgICAgICAgY29uc3QgY3VySW5kZXggPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHRhZyA9IHRoaXMuZGF0YS50YWdzW2N1ckluZGV4XTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhZ3MuZmluZChpID0+IGkuaWQgPT09IHRhZy5pZCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGFncy5wdXNoKHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGFnczogc2VsZWN0ZWRUYWdzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuc2VsZWN0ZWRUYWdzKTtcbiAgICB9LFxuICAgIGRlbGV0ZVRhZyhlOiBhbnkpIHtcbiAgICAgICAgbGV0IHRhZ0luZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFnSW5kZXg7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhZ0luZGV4KTtcbiAgICAgICAgbGV0IHNlbGVjdGVkVGFncyA9IHRoaXMuZGF0YS5zZWxlY3RlZFRhZ3M7XG4gICAgICAgIHNlbGVjdGVkVGFncy5zcGxpY2UodGFnSW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2VsZWN0ZWRUYWdzOiBzZWxlY3RlZFRhZ3NcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjaG9vc2VJbWFnZSgpIHtcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVJdGVtID0gbmV3IFVwbG9hZEltYWdlSXRlbU9iaih0aGlzLmRhdGEudXBUb2tlbiwgcmVzLnRlbXBGaWxlUGF0aHNbMF0sICdpdGVtX2NvdmVyJywgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ292ZXI6IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZmlsZUl0ZW0udXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3ZlcjogZmlsZUl0ZW1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjbGVhckZvcm0oKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7fSk7XG4gICAgfSxcbiAgICBiaW5kQ2xhc3NDb2x1bW5DaGFuZ2UoZTogYW55KSB7XG4gICAgICAgIGlmIChlLmRldGFpbFsnY29sdW1uJ10gPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGdyYWRlSW5kZXggPSBwYXJzZUludChlLmRldGFpbC52YWx1ZSk7XG4gICAgICAgICAgICBsZXQgY2xhc3NUcmVlID0gdGhpcy5kYXRhLmNsYXNzVHJlZSBhcyBBcnJheTxHcmFkZT47XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGNsYXNzQXJyOiBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jbGFzc0FyclswXSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NUcmVlW2dyYWRlSW5kZXhdLmNsYXNzZXMubWFwKGkgPT4gaS5uYW1lKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9LFxuICAgIGJpbmRDbGFzc0NoYW5nZShlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgY2xhc3NJbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgY2xhc3NJbmRleDogY2xhc3NJbmRleFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGZvcm1TdWJtaXQoZTogYW55KSB7XG4gICAgICAgIGxldCBjbGFzc1RyZWUgPSB0aGlzLmRhdGEuY2xhc3NUcmVlIGFzIEFycmF5PEdyYWRlPjtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhZ3M6IG51bWJlcltdID0gW107XG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZFRhZ3MuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIHRhZ3MucHVzaChpLmlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSA8SXRlbT57XG4gICAgICAgICAgICB0aXRsZTogZm9ybVZhbHVlWyd0aXRsZSddLFxuICAgICAgICAgICAgdHlwZTogZm9ybVZhbHVlWyd0eXBlJ10sXG4gICAgICAgICAgICB0YWdJZHM6IHRhZ3MsXG4gICAgICAgICAgICBjb3ZlclVybDogdGhpcy5kYXRhLnNlbGVjdGVkQ292ZXIuZmlsZU5hbWUsXG4gICAgICAgICAgICBkZXNjOiBmb3JtVmFsdWVbJ2Rlc2MnXVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZm9ybVZhbHVlWydjbGFzcyddICYmIGZvcm1WYWx1ZVsnY2xhc3MnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBuZXdJdGVtLmNsYXNzSWQgPSBjbGFzc1RyZWVbZm9ybVZhbHVlWydjbGFzcyddWzBdXS5jbGFzc2VzW2Zvcm1WYWx1ZVsnY2xhc3MnXVsxXV0uaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cobmV3SXRlbSk7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuaXNOZXcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5pdGVtQXBpLmNyZWF0ZShuZXdJdGVtKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4iuS8oOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbnu6fnu63kuIrkvKA/JyxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiAn6L+U5ZueJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmliZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVJbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3ZlcjogPFVwbG9hZEltYWdlSXRlbT57fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWdzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLml0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaXRlbUFwaS51cGRhdGUodGhpcy5kYXRhLml0ZW0uaWQsIG5ld0l0ZW0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==