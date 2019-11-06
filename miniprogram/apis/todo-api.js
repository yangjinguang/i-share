"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var TodoApi = (function () {
    function TodoApi() {
        this.http = new http_client_1.HttpClient();
    }
    TodoApi.prototype.getList = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/todo");
    };
    TodoApi.prototype.getCount = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/todo/count");
    };
    return TodoApi;
}());
exports.TodoApi = TodoApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2RvLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFnRDtBQUNoRCwwQ0FBdUM7QUFHdkM7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHlCQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLFVBQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSwwQkFBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxnQkFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vdXRpbHMvY29uZmlnJztcbmltcG9ydCB7VG9kb0xpc3R9IGZyb20gJy4uL3V0aWxzL3R5cGVzL3RvZG8tbGlzdCc7XG5cbmV4cG9ydCBjbGFzcyBUb2RvQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGlzdCgpOiBQcm9taXNlPFRvZG9MaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS90b2RvYCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvdW50KCk6IFByb21pc2U8eyBjb3VudDogbnVtYmVyIH0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3RvZG8vY291bnRgKTtcbiAgICB9XG59Il19