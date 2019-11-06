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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxvREFBZ0Q7QUFNaEQ7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHlCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGNBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsS0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixNQUFlO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsY0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsTUFBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLEtBQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsT0FBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLFVBQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sdUJBQUssR0FBWixVQUFhLElBQVksRUFBRSxJQUFZLEVBQUUsS0FBYztRQUNuRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLFVBQU8sRUFBRTtZQUM5QyxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLEtBQUssSUFBSSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHTSwwQkFBUSxHQUFmLFVBQWdCLElBQVksRUFBRSxJQUFZO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsY0FBVyxFQUFFO1lBQ2xELElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sd0JBQU0sR0FBYixVQUFjLEVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxjQUFTLEVBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsc0JBQWlCLEVBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTSx3QkFBTSxHQUFiLFVBQWMsRUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGNBQVMsRUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLHdCQUFNLEdBQWIsVUFBYyxFQUFVLEVBQUUsT0FBYTtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGNBQVMsRUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSxzQkFBSSxHQUFYLFVBQVksRUFBVSxFQUFFLGVBQThCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsb0JBQWUsRUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFTSw0QkFBVSxHQUFqQixVQUFrQixRQUFnQjtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLHNCQUFpQixRQUFVLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sa0NBQWdCLEdBQXZCLFVBQXdCLFVBQW9CO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsa0JBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sZ0NBQWMsR0FBckIsVUFBc0IsRUFBVTtRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGlDQUE0QixFQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU0saUNBQWUsR0FBdEIsVUFBdUIsUUFBZ0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSwwQkFBcUIsUUFBVSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLG9DQUFrQixHQUF6QixVQUEwQixRQUFnQixFQUFFLE1BQWM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQ0FBNEIsUUFBUSxTQUFJLE1BQVEsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQztBQXRGWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XG5pbXBvcnQge0l0ZW1UYWd9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2l0ZW0tdGFnJztcbmltcG9ydCB7SXRlbX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvaXRlbSc7XG5pbXBvcnQge0l0ZW1RdWVyeVJlc3BvbnNlfSBmcm9tICcuLi91dGlscy90eXBlcy9pdGVtLXF1ZXJ5LXJlc3BvbnNlJztcbmltcG9ydCB7SXRlbUxlbmRPcmRlcn0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvaXRlbS1sZW5kLW9yZGVyJztcblxuZXhwb3J0IGNsYXNzIEl0ZW1BcGkge1xuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUYWdzKCk6IFByb21pc2U8SXRlbVRhZ1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL3RhZ2ApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUYWcodGFnSWQ6IG51bWJlcik6IFByb21pc2U8SXRlbVRhZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWcvJHt0YWdJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGFnKG5ld1RhZzogSXRlbVRhZyk6IFByb21pc2U8SXRlbVRhZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vdGFnYCwgbmV3VGFnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlVGFnKHRhZ0lkOiBudW1iZXIsIG5ld1RhZzogSXRlbVRhZyk6IFByb21pc2U8SXRlbVRhZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS90YWcvJHt0YWdJZH1gLCBuZXdUYWcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVUYWcodGFnSWQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL3RhZy8ke3RhZ0lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUobmV3SXRlbTogSXRlbSk6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1gLCBuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlcnkocGFnZTogbnVtYmVyLCBzaXplOiBudW1iZXIsIHRhZ0lkPzogbnVtYmVyKTogUHJvbWlzZTxJdGVtUXVlcnlSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbWAsIHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICAgICAgdGFnOiB0YWdJZCB8fCBudWxsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgXG5cbiAgICBwdWJsaWMgcXVlcnlNZ3IocGFnZTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBQcm9taXNlPEl0ZW1RdWVyeVJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtL21ncmAsIHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPbmUoaWQ6IG51bWJlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbS8ke2lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZXRhaWwoaWQ6IG51bWJlcik6IFByb21pc2U8SXRlbT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvZGV0YWlsLyR7aWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShpZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vJHtpZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGlkOiBudW1iZXIsIG5ld0l0ZW06IEl0ZW0pOiBQcm9taXNlPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW0vJHtpZH1gLCBuZXdJdGVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hbihpZDogbnVtYmVyLCBuZXdMb2FuZWRSZWNvcmQ6IEl0ZW1MZW5kT3JkZXIpOiBQcm9taXNlPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1zL2xvYW4vJHtpZH1gLCBuZXdMb2FuZWRSZWNvcmQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FuUmV0dXJuKHJlY29yZElkOiBzdHJpbmcpOiBQcm9taXNlPEl0ZW1MZW5kT3JkZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1zL3JldHVybi8ke3JlY29yZElkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMb2FuZWRSZWNvcmRzKHN0YXR1c0xpc3Q6IG51bWJlcltdKTogUHJvbWlzZTxJdGVtTGVuZE9yZGVyW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1zL2xvYW5lZGAsIHtzdGF0dXM6IHN0YXR1c0xpc3Quam9pbignLCcpfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbEl0ZW1Mb2FuKGlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vaXRlbXMvbG9hblJlY29yZC9jYW5jZWwvJHtpZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TG9hbmVkUmVjb3JkKHJlY29yZElkOiBzdHJpbmcpOiBQcm9taXNlPEl0ZW1MZW5kT3JkZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2l0ZW1zL2xvYW5SZWNvcmQvJHtyZWNvcmRJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hbmVkUmVjb3JkU3RhdHVzKHJlY29yZElkOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyKTogUHJvbWlzZTxJdGVtTGVuZE9yZGVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9pdGVtcy9sb2FuUmVjb3JkL3N0YXR1cy8ke3JlY29yZElkfS8ke3N0YXR1c31gKTtcbiAgICB9XG59XG4iXX0=