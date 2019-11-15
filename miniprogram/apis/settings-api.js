"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var SettingsApi = (function () {
    function SettingsApi() {
        this.http = new http_client_1.HttpClient();
    }
    SettingsApi.prototype.uploadToken = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/settings/upload-token");
    };
    SettingsApi.prototype.getBanners = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/settings/banner");
    };
    SettingsApi.prototype.updateBanners = function (images) {
        return this.http.put(config_1.config.apiBaseUrl + "/settings/banner", images);
    };
    return SettingsApi;
}());
exports.SettingsApi = SettingsApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUd2QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0saUNBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLDJCQUF3QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLGdDQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxxQkFBa0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTSxtQ0FBYSxHQUFwQixVQUFxQixNQUFnQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLHFCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtCYW5uZXJ9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2Jhbm5lcic7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0FwaSB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwbG9hZFRva2VuKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zZXR0aW5ncy91cGxvYWQtdG9rZW5gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QmFubmVycygpOiBQcm9taXNlPEJhbm5lcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zZXR0aW5ncy9iYW5uZXJgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQmFubmVycyhpbWFnZXM6IHN0cmluZ1tdKTogUHJvbWlzZTxCYW5uZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NldHRpbmdzL2Jhbm5lcmAsIGltYWdlcyk7XG4gICAgfVxufVxuIl19