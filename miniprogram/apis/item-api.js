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
    ItemApi.prototype.query = function (page, size, tagId) {
        return this.http.get(config_1.config.apiBaseUrl + "/item", {
            page: page,
            size: size,
            tag: tagId || null
        });
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
    ItemApi.prototype.loan = function (id, newLoanedRecord) {
        return this.http.put(config_1.config.apiBaseUrl + "/items/loan/" + id, newLoanedRecord);
    };
    ItemApi.prototype.loanReturn = function (recordId) {
        return this.http.put(config_1.config.apiBaseUrl + "/items/return/" + recordId);
    };
    ItemApi.prototype.getLoanedRecords = function (statusList) {
        return this.http.get(config_1.config.apiBaseUrl + "/items/loaned", { status: statusList.join(',') });
    };
    ItemApi.prototype.cancelItemLoan = function (id) {
        return this.http.delete(config_1.config.apiBaseUrl + "/items/loanRecord/cancel/" + id);
    };
    ItemApi.prototype.getLoanedRecord = function (recordId) {
        return this.http.get(config_1.config.apiBaseUrl + "/items/loanRecord/" + recordId);
    };
    ItemApi.prototype.loanedRecordStatus = function (recordId, status) {
        return this.http.put(config_1.config.apiBaseUrl + "/items/loanRecord/status/" + recordId + "/" + status);
    };
    return ItemApi;
}());
exports.ItemApi = ItemApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxvREFBZ0Q7QUFNaEQ7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHlCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGNBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixNQUFlO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsY0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsTUFBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsT0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLFVBQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0s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QUMsQUEzRkQsSUEyRkM7QUEzRlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vdXRpbHMvY29uZmlnJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnLi4vdXRpbHMvaHR0cC1jbGllbnQnO1xuaW1wb3J0IHtJdGVtVGFnfSBmcm9tICcuLi91dGlscy90eXBlcy9pdGVtLXRhZyc7XG5pbXBvcnQge0l0ZW19IGZyb20gJy4uL3V0aWxzL3R5cGVzL2l0ZW0nO1xuaW1wb3J0IHtJdGVtUXVlcnlSZXNwb25zZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvaXRlbS1xdWVyeS1yZXNwb25zZSc7XG5pbXBvcnQge0l0ZW1MZW5kT3JkZXJ9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2l0ZW0tbGVuZC1vcmRlcic7XG5cbmV4cG9ydCBjbGFzcyBJdGVtQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGFncygpOiBQcm9taXNlPEl0ZW1UYWdbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWdgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGFnKHRhZ0lkOiBudW1iZXIpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vdGFnLyR7dGFnSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZVRhZyhuZXdUYWc6IEl0ZW1UYWcpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL3RhZ2AsIG5ld1RhZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVRhZyh0YWdJZDogbnVtYmVyLCBuZXdUYWc6IEl0ZW1UYWcpOiBQcm9taXNlPEl0ZW1UYWc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vdGFnLyR7dGFnSWR9YCwgbmV3VGFnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlVGFnKHRhZ0lkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWcvJHt0YWdJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKG5ld0l0ZW06IEl0ZW0pOiBQcm9taXNlPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtYCwgbmV3SXRlbSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaChzOiBzdHJpbmcpOiBQcm9taXNlPEl0ZW1bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS9zZWFyY2hgLCB7czogc30pO1xuICAgIH1cblxuXG4gICAgcHVibGljIHF1ZXJ5KHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyLCB0YWdJZD86IG51bWJlcik6IFByb21pc2U8SXRlbVF1ZXJ5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1gLCB7XG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgIHRhZzogdGFnSWQgfHwgbnVsbFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBxdWVyeU1ncihwYWdlOiBudW1iZXIsIHNpemU6IG51bWJlcik6IFByb21pc2U8SXRlbVF1ZXJ5UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vbWdyYCwge1xuICAgICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9uZShpZDogbnVtYmVyKTogUHJvbWlzZTxJdGVtPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtLyR7aWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERldGFpbChpZDogbnVtYmVyKTogUHJvbWlzZTxJdGVtPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtcy9kZXRhaWwvJHtpZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlKGlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS8ke2lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoaWQ6IG51bWJlciwgbmV3SXRlbTogSXRlbSk6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS8ke2lkfWAsIG5ld0l0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FuKGlkOiBudW1iZXIsIG5ld0xvYW5lZFJlY29yZDogSXRlbUxlbmRPcmRlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvbG9hbi8ke2lkfWAsIG5ld0xvYW5lZFJlY29yZCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYW5SZXR1cm4ocmVjb3JkSWQ6IHN0cmluZyk6IFByb21pc2U8SXRlbUxlbmRPcmRlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvcmV0dXJuLyR7cmVjb3JkSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExvYW5lZFJlY29yZHMoc3RhdHVzTGlzdDogbnVtYmVyW10pOiBQcm9taXNlPEl0ZW1MZW5kT3JkZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvbG9hbmVkYCwge3N0YXR1czogc3RhdHVzTGlzdC5qb2luKCcsJyl9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2FuY2VsSXRlbUxvYW4oaWQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtcy9sb2FuUmVjb3JkL2NhbmNlbC8ke2lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMb2FuZWRSZWNvcmQocmVjb3JkSWQ6IHN0cmluZyk6IFByb21pc2U8SXRlbUxlbmRPcmRlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvbG9hblJlY29yZC8ke3JlY29yZElkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FuZWRSZWNvcmRTdGF0dXMocmVjb3JkSWQ6IHN0cmluZywgc3RhdHVzOiBudW1iZXIpOiBQcm9taXNlPEl0ZW1MZW5kT3JkZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1zL2xvYW5SZWNvcmQvc3RhdHVzLyR7cmVjb3JkSWR9LyR7c3RhdHVzfWApO1xuICAgIH1cbn1cbiJdfQ==