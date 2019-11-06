"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var ShareApi = (function () {
    function ShareApi() {
        this.http = new http_client_1.HttpClient();
    }
    ShareApi.prototype.query = function (classId, page, size) {
        return this.http.get(config_1.config.apiBaseUrl + "/shares", {
            classId: classId,
            page: page.toString(),
            size: size.toString()
        });
    };
    ShareApi.prototype.create = function (newShare) {
        return this.http.post(config_1.config.apiBaseUrl + "/shares", newShare);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUl2QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sd0JBQUssR0FBWixVQUFhLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWTtRQUNwRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLFlBQVMsRUFBRTtZQUNoRCxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0seUJBQU0sR0FBYixVQUFjLFFBQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxlQUFNLENBQUMsVUFBVSxZQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUscUJBQWdCLE9BQVMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSx3QkFBSyxHQUFaLFVBQWEsSUFBWSxFQUFFLElBQVk7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFZLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGdCQUFXLE9BQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSx1QkFBSSxHQUFYLFVBQVksT0FBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLHFCQUFnQixPQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sZ0NBQWEsR0FBcEIsVUFBcUIsT0FBZSxFQUFFLFdBQW1CO1FBQ3JELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsd0JBQW1CLE9BQVMsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQXRDWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnLi4vdXRpbHMvaHR0cC1jbGllbnQnO1xuaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL3V0aWxzL2NvbmZpZyc7XG5pbXBvcnQge1NoYXJlfSBmcm9tICcuLi91dGlscy90eXBlcy9zaGFyZSc7XG5pbXBvcnQge1NoYXJlTGlzdFJlc3BvbnNlfSBmcm9tICcuLi91dGlscy90eXBlcy9zaGFyZS1saXN0LXJlc3BvbnNlJztcblxuZXhwb3J0IGNsYXNzIFNoYXJlQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlcnkoY2xhc3NJZDogbnVtYmVyLCBwYWdlOiBudW1iZXIsIHNpemU6IG51bWJlcik6IFByb21pc2U8U2hhcmVMaXN0UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlc2AsIHtcbiAgICAgICAgICAgIGNsYXNzSWQ6IGNsYXNzSWQsXG4gICAgICAgICAgICBwYWdlOiBwYWdlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBzaXplOiBzaXplLnRvU3RyaW5nKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZShuZXdTaGFyZTogU2hhcmUpOiBQcm9taXNlPFNoYXJlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzYCwgbmV3U2hhcmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPbmUoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxTaGFyZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzL2J5SWQvJHtzaGFyZUlkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNeShwYWdlOiBudW1iZXIsIHNpemU6IG51bWJlcik6IFByb21pc2U8U2hhcmVMaXN0UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy9teWAsIHtwYWdlOiBwYWdlLnRvU3RyaW5nKCksIHNpemU6IHNpemUudG9TdHJpbmcoKX0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy8ke3NoYXJlSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxpa2Uoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxTaGFyZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzL2xpa2UvJHtzaGFyZUlkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDb21tZW50KHNoYXJlSWQ6IG51bWJlciwgY29tbWVudEJvZHk6IHN0cmluZyk6IFByb21pc2U8U2hhcmU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zaGFyZXMvY29tbWVudC8ke3NoYXJlSWR9YCwge2JvZHk6IGNvbW1lbnRCb2R5fSk7XG4gICAgfVxufVxuIl19