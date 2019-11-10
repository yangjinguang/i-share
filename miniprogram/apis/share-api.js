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
        return this.http.get(config_1.config.apiBaseUrl + "/shares/my", { page: page, size: size });
    };
    ShareApi.prototype.delete = function (shareId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/shares/" + shareId);
    };
    ShareApi.prototype.like = function (shareId) {
        return this.http.put(config_1.config.apiBaseUrl + "/share/" + shareId + "/like");
    };
    ShareApi.prototype.getLikes = function (shareId) {
        return this.http.get(config_1.config.apiBaseUrl + "/share/" + shareId + "/like");
    };
    ShareApi.prototype.comment = function (shareId, comment) {
        return this.http.put(config_1.config.apiBaseUrl + "/share/" + shareId + "/comment", { comment: comment });
    };
    ShareApi.prototype.getComments = function (shareId) {
        return this.http.get(config_1.config.apiBaseUrl + "/share/" + shareId + "/comment");
    };
    return ShareApi;
}());
exports.ShareApi = ShareApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQU12QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sd0JBQUssR0FBWixVQUFhLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWTtRQUNwRCxJQUFJLEtBQUssR0FBUTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsSUFBSSxPQUFPLEVBQUU7WUFDVCxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsUUFBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLFdBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0seUJBQU0sR0FBYixVQUFjLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxxQkFBZ0IsT0FBUyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLHdCQUFLLEdBQVosVUFBYSxJQUFZLEVBQUUsSUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUksZUFBTSxDQUFDLFVBQVUsZ0JBQVcsT0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxPQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsZUFBVSxPQUFPLFVBQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQU8sVUFBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxPQUFlLEVBQUUsT0FBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBTyxhQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sOEJBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBTyxhQUFVLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtTaGFyZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc2hhcmUnO1xuaW1wb3J0IHtTaGFyZUxpc3RSZXNwb25zZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc2hhcmUtbGlzdC1yZXNwb25zZSc7XG5pbXBvcnQge1NoYXJlTGlrZX0gZnJvbSAnLi4vdXRpbHMvc2hhcmUtbGlrZSc7XG5pbXBvcnQge1NoYXJlQ29tbWVudH0gZnJvbSAnLi4vdXRpbHMvc2hhcmUtY29tbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBTaGFyZUFwaSB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXJ5KGNsYXNzSWQ6IG51bWJlciwgcGFnZTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlTGlzdFJlc3BvbnNlPiB7XG4gICAgICAgIGxldCBxdWVyeSA9IDxhbnk+e1xuICAgICAgICAgICAgcGFnZTogcGFnZSxcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNsYXNzSWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmNsYXNzSWQgPSBjbGFzc0lkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZWAsIHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKG5ld1NoYXJlOiBTaGFyZSk6IFByb21pc2U8U2hhcmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZWAsIG5ld1NoYXJlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0T25lKHNoYXJlSWQ6IG51bWJlcik6IFByb21pc2U8U2hhcmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy9ieUlkLyR7c2hhcmVJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TXkocGFnZTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlTGlzdFJlc3BvbnNlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZXMvbXlgLCB7cGFnZTogcGFnZSwgc2l6ZTogc2l6ZX0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy8ke3NoYXJlSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxpa2Uoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlLyR7c2hhcmVJZH0vbGlrZWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMaWtlcyhzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlTGlrZVtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZS8ke3NoYXJlSWR9L2xpa2VgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tbWVudChzaGFyZUlkOiBudW1iZXIsIGNvbW1lbnQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZS8ke3NoYXJlSWR9L2NvbW1lbnRgLCB7Y29tbWVudDogY29tbWVudH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb21tZW50cyhzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPFNoYXJlQ29tbWVudFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZS8ke3NoYXJlSWR9L2NvbW1lbnRgKTtcbiAgICB9XG59XG4iXX0=