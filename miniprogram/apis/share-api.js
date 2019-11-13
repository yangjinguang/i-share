"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var ShareApi = (function () {
    function ShareApi() {
        this.http = new http_client_1.HttpClient();
    }
    ShareApi.prototype.query = function (classId, userId, page, size) {
        var query = {
            page: page,
            size: size
        };
        if (classId) {
            query.classId = classId;
        }
        if (userId) {
            query.userId = userId;
        }
        return this.http.get(config_1.config.apiBaseUrl + "/share", query);
    };
    ShareApi.prototype.create = function (newShare) {
        return this.http.post(config_1.config.apiBaseUrl + "/share", newShare);
    };
    ShareApi.prototype.getOne = function (shareId) {
        return this.http.get(config_1.config.apiBaseUrl + "/share/" + shareId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQU12QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sd0JBQUssR0FBWixVQUFhLE9BQWUsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDcEUsSUFBSSxLQUFLLEdBQVE7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLElBQUksT0FBTyxFQUFFO1lBQ1QsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDM0I7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNSLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxXQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxRQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLHdCQUFLLEdBQVosVUFBYSxJQUFZLEVBQUUsSUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUksZUFBTSxDQUFDLFVBQVUsZ0JBQVcsT0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLHVCQUFJLEdBQVgsVUFBWSxPQUFlO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsZUFBVSxPQUFPLFVBQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQU8sVUFBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLDBCQUFPLEdBQWQsVUFBZSxPQUFlLEVBQUUsT0FBZTtRQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBTyxhQUFVLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sOEJBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBTyxhQUFVLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtTaGFyZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc2hhcmUnO1xuaW1wb3J0IHtTaGFyZUxpc3RSZXNwb25zZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc2hhcmUtbGlzdC1yZXNwb25zZSc7XG5pbXBvcnQge1NoYXJlTGlrZX0gZnJvbSAnLi4vdXRpbHMvc2hhcmUtbGlrZSc7XG5pbXBvcnQge1NoYXJlQ29tbWVudH0gZnJvbSAnLi4vdXRpbHMvc2hhcmUtY29tbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBTaGFyZUFwaSB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXJ5KGNsYXNzSWQ6IG51bWJlciwgdXNlcklkOiBudW1iZXIsIHBhZ2U6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogUHJvbWlzZTxTaGFyZUxpc3RSZXNwb25zZT4ge1xuICAgICAgICBsZXQgcXVlcnkgPSA8YW55PntcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgICBzaXplOiBzaXplXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjbGFzc0lkKSB7XG4gICAgICAgICAgICBxdWVyeS5jbGFzc0lkID0gY2xhc3NJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICBxdWVyeS51c2VySWQgPSB1c2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlYCwgcXVlcnkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUobmV3U2hhcmU6IFNoYXJlKTogUHJvbWlzZTxTaGFyZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlYCwgbmV3U2hhcmUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPbmUoc2hhcmVJZDogbnVtYmVyKTogUHJvbWlzZTxTaGFyZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmUvJHtzaGFyZUlkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNeShwYWdlOiBudW1iZXIsIHNpemU6IG51bWJlcik6IFByb21pc2U8U2hhcmVMaXN0UmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlcy9teWAsIHtwYWdlOiBwYWdlLCBzaXplOiBzaXplfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmVzLyR7c2hhcmVJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGlrZShzaGFyZUlkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vc2hhcmUvJHtzaGFyZUlkfS9saWtlYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExpa2VzKHNoYXJlSWQ6IG51bWJlcik6IFByb21pc2U8U2hhcmVMaWtlW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlLyR7c2hhcmVJZH0vbGlrZWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21tZW50KHNoYXJlSWQ6IG51bWJlciwgY29tbWVudDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlLyR7c2hhcmVJZH0vY29tbWVudGAsIHtjb21tZW50OiBjb21tZW50fSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbW1lbnRzKHNoYXJlSWQ6IG51bWJlcik6IFByb21pc2U8U2hhcmVDb21tZW50W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NoYXJlLyR7c2hhcmVJZH0vY29tbWVudGApO1xuICAgIH1cbn1cbiJdfQ==