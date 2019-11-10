"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var ShareApi = (function () {
    function ShareApi() {
        this.http = new http_client_1.HttpClient();
    }
    ShareApi.prototype.query = function (classId, page, size) {
        var query = {
            page: page,
            size: size
        };
        if (classId) {
            query.classId = classId;
        }
        return this.http.get(config_1.config.apiBaseUrl + "/share", query);
    };
    ShareApi.prototype.create = function (newShare) {
        return this.http.post(config_1.config.apiBaseUrl + "/share", newShare);
    };
    ShareApi.prototype.getOne = function (shareId) {
        return this.http.get(config_1.config.apiBaseUrl + "/shares/byId/" + shareId);
    };
    ShareApi.prototype.getMy = function (page, size) {
        return this.http.get(config_1.config.apiBaseUrl + "/shares/my", { page: page.toString(), size: size.toString() });
    };
    ShareApi.prototype.delete = function (shareId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/shares/" + shareId);
    };
    ShareApi.prototype.like = function (shareId) {
        return this.http.put(config_1.config.apiBaseUrl + "/shares/like/" + shareId);
    };
    ShareApi.prototype.createComment = function (shareId, commentBody) {
        return this.http.post(config_1.config.apiBaseUrl + "/shares/comment/" + shareId, { body: commentBody });
    };
    return ShareApi;
}());
exports.ShareApi = ShareApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUl2QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sd0JBQUssR0FBWixVQUFhLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWTtRQUNwRCxJQUFJLEtBQUssR0FBUTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsSUFBSSxPQUFPLEVBQUU7WUFDVCxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsUUFBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLFdBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0seUJBQU0sR0FBYixVQUFjLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxxQkFBZ0IsT0FBUyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLHdCQUFLLEdBQVosVUFBYSxJQUFZLEVBQUUsSUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUksZUFBTSxDQUFDLFVBQVUsZ0JBQVcsT0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxPQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUscUJBQWdCLE9BQVMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxnQ0FBYSxHQUFwQixVQUFxQixPQUFlLEVBQUUsV0FBbUI7UUFDckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxlQUFNLENBQUMsVUFBVSx3QkFBbUIsT0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vdXRpbHMvY29uZmlnJztcbmltcG9ydCB7U2hhcmV9IGZyb20gJy4uL3V0aWxzL3R5cGVzL3NoYXJlJztcbmltcG9ydCB7U2hhcmVMaXN0UmVzcG9uc2V9IGZyb20gJy4uL3V0aWxzL3R5cGVzL3NoYXJlLWxpc3QtcmVzcG9uc2UnO1xuXG5leHBvcnQgY2xhc3MgU2hhcmVBcGkge1xuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBxdWVyeShjbGFzc0lkOiBudW1iZXIsIHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogUHJvbWlzZTxTaGFyZUxpc3RSZXNwb25zZT4ge1xuICAgICAgICBsZXQgcXVlcnkgPSA8YW55PntcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjbGFzc0lkKSB7XG4gICAgICAgICAgICBxdWVyeS5jbGFzc0lkID0gY2xhc3NJZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVgLCBxdWVyeSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZShuZXdTaGFyZTogU2hhcmUpOiBQcm9taXNlPFNoYXJlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVgLCBuZXdTaGFyZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE9uZShzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZXMvYnlJZC8ke3NoYXJlSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE15KHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogUHJvbWlzZTxTaGFyZUxpc3RSZXNwb25zZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzL215YCwge3BhZ2U6IHBhZ2UudG9TdHJpbmcoKSwgc2l6ZTogc2l6ZS50b1N0cmluZygpfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzLyR7c2hhcmVJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlrZShzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZXMvbGlrZS8ke3NoYXJlSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNvbW1lbnQoc2hhcmVJZDogbnVtYmVyLCBjb21tZW50Qm9keTogc3RyaW5nKTogUHJvbWlzZTxTaGFyZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy9jb21tZW50LyR7c2hhcmVJZH1gLCB7Ym9keTogY29tbWVudEJvZHl9KTtcbiAgICB9XG59XG4iXX0=