"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var StudentApi = (function () {
    function StudentApi() {
        this.http = new http_client_1.HttpClient();
    }
    StudentApi.prototype.get = function (studentId) {
        return this.http.get(config_1.config.apiBaseUrl + "/student/" + studentId);
    };
    StudentApi.prototype.getByClass = function (classId) {
        return this.http.get(config_1.config.apiBaseUrl + "/student/by-class-id/" + classId);
    };
    StudentApi.prototype.create = function (newStudent) {
        return this.http.post(config_1.config.apiBaseUrl + "/student", newStudent);
    };
    StudentApi.prototype.update = function (studentId, newStudent) {
        return this.http.put(config_1.config.apiBaseUrl + "/student/" + studentId, newStudent);
    };
    StudentApi.prototype.delete = function (studentId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/student/" + studentId);
    };
    return StudentApi;
}());
exports.StudentApi = StudentApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHVkZW50LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFnRDtBQUNoRCwwQ0FBdUM7QUFHdkM7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHdCQUFHLEdBQVYsVUFBVyxTQUFpQjtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGlCQUFZLFNBQVcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSwrQkFBVSxHQUFqQixVQUFrQixPQUFlO1FBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsNkJBQXdCLE9BQVMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFTSwyQkFBTSxHQUFiLFVBQWMsVUFBbUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBSSxlQUFNLENBQUMsVUFBVSxhQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxTQUFpQixFQUFFLFVBQW1CO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsaUJBQVksU0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFTSwyQkFBTSxHQUFiLFVBQWMsU0FBaUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBWSxTQUFXLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vdXRpbHMvY29uZmlnJztcbmltcG9ydCB7U3R1ZGVudH0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvc3R1ZGVudCc7XG5cbmV4cG9ydCBjbGFzcyBTdHVkZW50QXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KHN0dWRlbnRJZDogbnVtYmVyKTogUHJvbWlzZTxTdHVkZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zdHVkZW50LyR7c3R1ZGVudElkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCeUNsYXNzKGNsYXNzSWQ6IG51bWJlcik6IFByb21pc2U8U3R1ZGVudFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zdHVkZW50L2J5LWNsYXNzLWlkLyR7Y2xhc3NJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlKG5ld1N0dWRlbnQ6IFN0dWRlbnQpOiBQcm9taXNlPFN0dWRlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zdHVkZW50YCwgbmV3U3R1ZGVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShzdHVkZW50SWQ6IG51bWJlciwgbmV3U3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vc3R1ZGVudC8ke3N0dWRlbnRJZH1gLCBuZXdTdHVkZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlKHN0dWRlbnRJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3N0dWRlbnQvJHtzdHVkZW50SWR9YCk7XG4gICAgfVxufVxuIl19