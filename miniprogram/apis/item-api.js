"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../utils/config");
var http_client_1 = require("../utils/http-client");
var ItemApi = (function () {
    function ItemApi() {
        this.http = new http_client_1.HttpClient();
    }
    ItemApi.prototype.getTags = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/item/tag");
    };
    ItemApi.prototype.getTag = function (tagId) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/tag/" + tagId);
    };
    ItemApi.prototype.createTag = function (newTag) {
        return this.http.post(config_1.config.apiBaseUrl + "/item/tag", newTag);
    };
    ItemApi.prototype.updateTag = function (tagId, newTag) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/tag/" + tagId, newTag);
    };
    ItemApi.prototype.deleteTag = function (tagId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/item/tag/" + tagId);
    };
    ItemApi.prototype.create = function (newItem) {
        return this.http.post(config_1.config.apiBaseUrl + "/item", newItem);
    };
    ItemApi.prototype.search = function (s) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/search", { s: s });
    };
    ItemApi.prototype.query = function (page, size, tagId, classId) {
        var query = { page: page, size: size };
        if (tagId) {
            query['tagId'] = tagId;
        }
        if (classId) {
            query['classId'] = classId;
        }
        return this.http.get(config_1.config.apiBaseUrl + "/item", query);
    };
    ItemApi.prototype.queryMgr = function (page, size) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/mgr", {
            page: page,
            size: size
        });
    };
    ItemApi.prototype.getOne = function (id) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/" + id);
    };
    ItemApi.prototype.getDetail = function (id) {
        return this.http.get(config_1.config.apiBaseUrl + "/items/detail/" + id);
    };
    ItemApi.prototype.delete = function (id) {
        return this.http.delete(config_1.config.apiBaseUrl + "/item/" + id);
    };
    ItemApi.prototype.update = function (id, newItem) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/" + id, newItem);
    };
    ItemApi.prototype.lend = function (order) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/lend", order);
    };
    ItemApi.prototype.lendReturn = function (orderId) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/lend/return/" + orderId);
    };
    ItemApi.prototype.lendCancel = function (orderId) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/lend/cancel/" + orderId);
    };
    ItemApi.prototype.lendDelete = function (orderId) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/lend/delete/" + orderId);
    };
    ItemApi.prototype.getLendDetail = function (orderId) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/lend/detail/" + orderId);
    };
    ItemApi.prototype.lendOrderHandle = function (body) {
        return this.http.put(config_1.config.apiBaseUrl + "/item/lend/handle", body);
    };
    ItemApi.prototype.getMyLendOrders = function (status, page, size) {
        return this.http.get(config_1.config.apiBaseUrl + "/item/lend/my", {
            status: status.join(','),
            page: page,
            size: size
        });
    };
    return ItemApi;
}());
exports.ItemApi = ItemApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxvREFBZ0Q7QUFRaEQ7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHlCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGNBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixNQUFlO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsY0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsTUFBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsT0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLFVBQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0s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QVUsc0JBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLGlDQUFlLEdBQXRCLFVBQXVCLE1BQWdCLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDL0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxrQkFBZSxFQUFFO1lBQ3RELE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN4QixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBdEdELElBc0dDO0FBdEdZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL3V0aWxzL2NvbmZpZyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7SXRlbVRhZ30gZnJvbSAnLi4vdXRpbHMvdHlwZXMvaXRlbS10YWcnO1xuaW1wb3J0IHtJdGVtfSBmcm9tICcuLi91dGlscy90eXBlcy9pdGVtJztcbmltcG9ydCB7SXRlbVF1ZXJ5UmVzcG9uc2V9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2l0ZW0tcXVlcnktcmVzcG9uc2UnO1xuaW1wb3J0IHtJdGVtTGVuZE9yZGVyfSBmcm9tICcuLi91dGlscy90eXBlcy9pdGVtLWxlbmQtb3JkZXInO1xuaW1wb3J0IHtMZW5kT3JkZXJIYW5kbGVCb2R5fSBmcm9tICcuLi91dGlscy90eXBlcy9sZW5kLW9yZGVyLWhhbmRsZS1ib2R5JztcbmltcG9ydCB7UGFnaW5hdGlvbn0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvcGFnaW5hdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBJdGVtQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGFncygpOiBQcm9taXNlPEl0ZW1UYWdbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWdgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGFnKHRhZ0lkOiBudW1iZXIpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vdGFnLyR7dGFnSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZVRhZyhuZXdUYWc6IEl0ZW1UYWcpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL3RhZ2AsIG5ld1RhZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVRhZyh0YWdJZDogbnVtYmVyLCBuZXdUYWc6IEl0ZW1UYWcpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vdGFnLyR7dGFnSWR9YCwgbmV3VGFnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlVGFnKHRhZ0lkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWcvJHt0YWdJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKG5ld0l0ZW06IEl0ZW0pOiBQcm9taXNlPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtYCwgbmV3SXRlbSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaChzOiBzdHJpbmcpOiBQcm9taXNlPEl0ZW1bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9zZWFyY2hgLCB7czogc30pO1xuICAgIH1cblxuXG4gICAgcHVibGljIHF1ZXJ5KHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyLCB0YWdJZD86IG51bWJlciwgY2xhc3NJZD86IG51bWJlcik6IFByb21pc2U8SXRlbVF1ZXJ5UmVzcG9uc2U+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gPGFueT57cGFnZTogcGFnZSwgc2l6ZTogc2l6ZX07XG4gICAgICAgIGlmICh0YWdJZCkge1xuICAgICAgICAgICAgcXVlcnlbJ3RhZ0lkJ10gPSB0YWdJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xhc3NJZCkge1xuICAgICAgICAgICAgcXVlcnlbJ2NsYXNzSWQnXSA9IGNsYXNzSWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1gLCBxdWVyeSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgcXVlcnlNZ3IocGFnZTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBQcm9taXNlPEl0ZW1RdWVyeVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL21ncmAsIHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPbmUoaWQ6IG51bWJlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS8ke2lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZXRhaWwoaWQ6IG51bWJlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvZGV0YWlsLyR7aWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vJHtpZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGlkOiBudW1iZXIsIG5ld0l0ZW06IEl0ZW0pOiBQcm9taXNlPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vJHtpZH1gLCBuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGVuZChvcmRlcjogSXRlbUxlbmRPcmRlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9sZW5kYCwgb3JkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsZW5kUmV0dXJuKG9yZGVySWQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL2xlbmQvcmV0dXJuLyR7b3JkZXJJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGVuZENhbmNlbChvcmRlcklkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9sZW5kL2NhbmNlbC8ke29yZGVySWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxlbmREZWxldGUob3JkZXJJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vbGVuZC9kZWxldGUvJHtvcmRlcklkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMZW5kRGV0YWlsKG9yZGVySWQ6IG51bWJlcik6IFByb21pc2U8SXRlbUxlbmRPcmRlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9sZW5kL2RldGFpbC8ke29yZGVySWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxlbmRPcmRlckhhbmRsZShib2R5OiBMZW5kT3JkZXJIYW5kbGVCb2R5KTogUHJvbWlzZTxJdGVtTGVuZE9yZGVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL2xlbmQvaGFuZGxlYCwgYm9keSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE15TGVuZE9yZGVycyhzdGF0dXM6IG51bWJlcltdLCBwYWdlOiBudW1iZXIsIHNpemU6IG51bWJlcik6IFByb21pc2U8eyBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uLCBsaXN0OiBJdGVtTGVuZE9yZGVyW10gfT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9sZW5kL215YCwge1xuICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXMuam9pbignLCcpLFxuICAgICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19