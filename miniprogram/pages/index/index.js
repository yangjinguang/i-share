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
var login_1 = require("../../utils/login");
var settings_api_1 = require("../../apis/settings-api");
var item_api_1 = require("../../apis/item-api");
var share_api_1 = require("../../apis/share-api");
var utils_1 = require("../../utils/utils");
var app = getApp();
Page({
    data: {
        settingsApi: {},
        itemApi: {},
        shareApi: {},
        banners: [],
        items: [],
        shares: [],
        profile: {}
    },
    onLoad: function () {
        var _this = this;
        login_1.GetProfile(app, function (profile) {
            _this.setData({
                settingsApi: new settings_api_1.SettingsApi(),
                itemApi: new item_api_1.ItemApi(),
                shareApi: new share_api_1.ShareApi(),
                profile: profile
            });
            _this.dataInit();
        });
    },
    dataInit: function () {
        return __awaiter(this, void 0, void 0, function () {
            var banners, itemList, shareList, shares;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.data.settingsApi.getBanners()];
                    case 1:
                        banners = _a.sent();
                        return [4, this.data.itemApi.query(1, 3)];
                    case 2:
                        itemList = _a.sent();
                        return [4, this.data.shareApi.query(0, 0, 1, 5)];
                    case 3:
                        shareList = _a.sent();
                        shares = shareList.list;
                        utils_1.Utils.shareListSerialize.apply(utils_1.Utils, [1, this.data.profile].concat(shares));
                        this.setData({
                            banners: banners,
                            items: itemList.list,
                            shares: shares
                        });
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsMkNBQTZDO0FBQzdDLHdEQUFvRDtBQUNwRCxnREFBNEM7QUFDNUMsa0RBQThDO0FBSTlDLDJDQUF3QztBQUV4QyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUM3QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQWUsRUFBRTtRQUM1QixPQUFPLEVBQVcsRUFBRTtRQUNwQixRQUFRLEVBQVksRUFBRTtRQUN0QixPQUFPLEVBQVksRUFBRTtRQUNyQixLQUFLLEVBQVUsRUFBRTtRQUNqQixNQUFNLEVBQVcsRUFBRTtRQUNuQixPQUFPLEVBQVEsRUFBRTtLQUNwQjtJQUNELE1BQU07UUFBTixpQkFVQztRQVRHLGtCQUFVLENBQUMsR0FBRyxFQUFFLFVBQUMsT0FBTztZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFdBQVcsRUFBRSxJQUFJLDBCQUFXLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJLGtCQUFPLEVBQUU7Z0JBQ3RCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSyxRQUFROzs7Ozs0QkFDSSxXQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxFQUFBOzt3QkFBbEQsT0FBTyxHQUFHLFNBQXdDO3dCQUN2QyxXQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUE7O3dCQUE5QyxRQUFRLEdBQUcsU0FBbUM7d0JBQ2xDLFdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFBOzt3QkFBdEQsU0FBUyxHQUFHLFNBQTBDO3dCQUN0RCxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQzt3QkFDNUIsYUFBSyxDQUFDLGtCQUFrQixPQUF4QixhQUFLLEdBQW9CLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sU0FBSyxNQUFNLEdBQUU7d0JBQzFELElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1QsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSTs0QkFDcEIsTUFBTSxFQUFFLE1BQU07eUJBQ2pCLENBQUMsQ0FBQzs7Ozs7S0FDTjtDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi9hcHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy91c2VyJztcbmltcG9ydCB7R2V0UHJvZmlsZX0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nO1xuaW1wb3J0IHtTZXR0aW5nc0FwaX0gZnJvbSAnLi4vLi4vYXBpcy9zZXR0aW5ncy1hcGknO1xuaW1wb3J0IHtJdGVtQXBpfSBmcm9tICcuLi8uLi9hcGlzL2l0ZW0tYXBpJztcbmltcG9ydCB7U2hhcmVBcGl9IGZyb20gJy4uLy4uL2FwaXMvc2hhcmUtYXBpJztcbmltcG9ydCB7QmFubmVyfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9iYW5uZXInO1xuaW1wb3J0IHtJdGVtfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9pdGVtJztcbmltcG9ydCB7U2hhcmV9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3NoYXJlJztcbmltcG9ydCB7VXRpbHN9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgc2V0dGluZ3NBcGk6IDxTZXR0aW5nc0FwaT57fSxcbiAgICAgICAgaXRlbUFwaTogPEl0ZW1BcGk+e30sXG4gICAgICAgIHNoYXJlQXBpOiA8U2hhcmVBcGk+e30sXG4gICAgICAgIGJhbm5lcnM6IDxCYW5uZXJbXT5bXSxcbiAgICAgICAgaXRlbXM6IDxJdGVtW10+W10sXG4gICAgICAgIHNoYXJlczogPFNoYXJlW10+W10sXG4gICAgICAgIHByb2ZpbGU6IDxVc2VyPnt9XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEdldFByb2ZpbGUoYXBwLCAocHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nc0FwaTogbmV3IFNldHRpbmdzQXBpKCksXG4gICAgICAgICAgICAgICAgaXRlbUFwaTogbmV3IEl0ZW1BcGkoKSxcbiAgICAgICAgICAgICAgICBzaGFyZUFwaTogbmV3IFNoYXJlQXBpKCksXG4gICAgICAgICAgICAgICAgcHJvZmlsZTogcHJvZmlsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRhdGFJbml0KCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYXN5bmMgZGF0YUluaXQoKSB7XG4gICAgICAgIGxldCBiYW5uZXJzID0gYXdhaXQgdGhpcy5kYXRhLnNldHRpbmdzQXBpLmdldEJhbm5lcnMoKTtcbiAgICAgICAgbGV0IGl0ZW1MaXN0ID0gYXdhaXQgdGhpcy5kYXRhLml0ZW1BcGkucXVlcnkoMSwgMyk7XG4gICAgICAgIGxldCBzaGFyZUxpc3QgPSBhd2FpdCB0aGlzLmRhdGEuc2hhcmVBcGkucXVlcnkoMCwgMCwgMSwgNSk7XG4gICAgICAgIGxldCBzaGFyZXMgPSBzaGFyZUxpc3QubGlzdDtcbiAgICAgICAgVXRpbHMuc2hhcmVMaXN0U2VyaWFsaXplKDEsIHRoaXMuZGF0YS5wcm9maWxlLCAuLi5zaGFyZXMpO1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgYmFubmVyczogYmFubmVycyxcbiAgICAgICAgICAgIGl0ZW1zOiBpdGVtTGlzdC5saXN0LFxuICAgICAgICAgICAgc2hhcmVzOiBzaGFyZXNcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXX0=