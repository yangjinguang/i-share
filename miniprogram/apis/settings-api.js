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
    SettingsApi.prototype.swiperGet = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/settings/swiper");
    };
    SettingsApi.prototype.swiperUpdate = function (images) {
        return this.http.put(config_1.config.apiBaseUrl + "/settings/swiper", { images: images });
    };
    return SettingsApi;
}());
exports.SettingsApi = SettingsApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0RBQWdEO0FBQ2hELDBDQUF1QztBQUd2QztJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0saUNBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLDJCQUF3QixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLCtCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxxQkFBa0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixNQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLHFCQUFrQixFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnLi4vdXRpbHMvaHR0cC1jbGllbnQnO1xuaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL3V0aWxzL2NvbmZpZyc7XG5pbXBvcnQge1N3aXBlcn0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc3dpcGVyJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBsb2FkVG9rZW4oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NldHRpbmdzL3VwbG9hZC10b2tlbmApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzd2lwZXJHZXQoKTogUHJvbWlzZTxTd2lwZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3NldHRpbmdzL3N3aXBlcmApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzd2lwZXJVcGRhdGUoaW1hZ2VzOiBzdHJpbmdbXSk6IFByb21pc2U8U3dpcGVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zZXR0aW5ncy9zd2lwZXJgLCB7aW1hZ2VzOiBpbWFnZXN9KTtcbiAgICB9XG59XG4iXX0=