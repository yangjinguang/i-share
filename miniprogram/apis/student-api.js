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
    StudentApi.prototype.getMy = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/student/my");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZGVudC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHVkZW50LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFnRDtBQUNoRCwwQ0FBdUM7QUFHdkM7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLHdCQUFHLEdBQVYsVUFBVyxTQUFpQjtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGlCQUFZLFNBQVcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSwwQkFBSyxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxnQkFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLCtCQUFVLEdBQWpCLFVBQWtCLE9BQWU7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSw2QkFBd0IsT0FBUyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxVQUFtQjtRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGFBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sMkJBQU0sR0FBYixVQUFjLFNBQWlCLEVBQUUsVUFBbUI7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBWSxTQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxTQUFpQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGlCQUFZLFNBQVcsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUE5QlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtTdHVkZW50fSBmcm9tICcuLi91dGlscy90eXBlcy9zdHVkZW50JztcblxuZXhwb3J0IGNsYXNzIFN0dWRlbnRBcGkge1xuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQoc3R1ZGVudElkOiBudW1iZXIpOiBQcm9taXNlPFN0dWRlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3N0dWRlbnQvJHtzdHVkZW50SWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE15KCk6IFByb21pc2U8U3R1ZGVudFtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zdHVkZW50L215YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJ5Q2xhc3MoY2xhc3NJZDogbnVtYmVyKTogUHJvbWlzZTxTdHVkZW50W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3N0dWRlbnQvYnktY2xhc3MtaWQvJHtjbGFzc0lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGUobmV3U3R1ZGVudDogU3R1ZGVudCk6IFByb21pc2U8U3R1ZGVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L3N0dWRlbnRgLCBuZXdTdHVkZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKHN0dWRlbnRJZDogbnVtYmVyLCBuZXdTdHVkZW50OiBTdHVkZW50KTogUHJvbWlzZTxTdHVkZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9zdHVkZW50LyR7c3R1ZGVudElkfWAsIG5ld1N0dWRlbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoc3R1ZGVudElkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vc3R1ZGVudC8ke3N0dWRlbnRJZH1gKTtcbiAgICB9XG59XG4iXX0=