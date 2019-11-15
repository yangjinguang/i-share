"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../utils/config");
var http_client_1 = require("../utils/http-client");
var ClassApi = (function () {
    function ClassApi() {
        this.http = new http_client_1.HttpClient();
    }
    ClassApi.prototype.classTree = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/class/tree");
    };
    ClassApi.prototype.gradeList = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/grade");
    };
    ClassApi.prototype.classList = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/class");
    };
    ClassApi.prototype.classListByGradeId = function (gradeId) {
        return this.http.get(config_1.config.apiBaseUrl + "/class/byGradeId/" + gradeId);
    };
    ClassApi.prototype.createGrade = function (newGrade) {
        return this.http.post(config_1.config.apiBaseUrl + "/grade", newGrade);
    };
    ClassApi.prototype.createClass = function (newClass) {
        return this.http.post(config_1.config.apiBaseUrl + "/class", newClass);
    };
    ClassApi.prototype.updateClass = function (classId, newClass) {
        return this.http.put(config_1.config.apiBaseUrl + "/class/" + classId, newClass);
    };
    ClassApi.prototype.updateGrade = function (gradeId, newGrade) {
        return this.http.put(config_1.config.apiBaseUrl + "/grade/" + gradeId, newGrade);
    };
    ClassApi.prototype.updateClassOrder = function (classIds) {
        return this.http.put(config_1.config.apiBaseUrl + "/class/order", classIds);
    };
    ClassApi.prototype.updateGradeOrder = function (gradeIds) {
        return this.http.put(config_1.config.apiBaseUrl + "/grade/order", gradeIds);
    };
    ClassApi.prototype.getGrade = function (gradeId) {
        return this.http.get(config_1.config.apiBaseUrl + "/grade/" + gradeId);
    };
    ClassApi.prototype.getClass = function (classId) {
        return this.http.get(config_1.config.apiBaseUrl + "/class/" + classId);
    };
    ClassApi.prototype.getMyClass = function () {
        return this.http.get(config_1.config.apiBaseUrl + "/class/my");
    };
    ClassApi.prototype.delete = function (classId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/class/" + classId);
    };
    ClassApi.prototype.deleteGrade = function (gradeId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/grade/" + gradeId);
    };
    return ClassApi;
}());
exports.ClassApi = ClassApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3MtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLG9EQUFnRDtBQUloRDtJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sNEJBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGdCQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sNEJBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSw0QkFBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLHFDQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUseUJBQW9CLE9BQVMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixRQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixRQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixPQUFlLEVBQUUsUUFBZTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixPQUFlLEVBQUUsUUFBZTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxtQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBa0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBYyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ3hFLENBQUM7SUFFTSxtQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBa0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBYyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ3hFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSw2QkFBVSxHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsY0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLHlCQUFNLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUksZUFBTSxDQUFDLFVBQVUsZUFBVSxPQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0sOEJBQVcsR0FBbEIsVUFBbUIsT0FBZTtRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQUFDLEFBbEVELElBa0VDO0FBbEVZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjb25maWd9IGZyb20gJy4uL3V0aWxzL2NvbmZpZyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7R3JhZGV9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2dyYWRlJztcbmltcG9ydCB7Q2xhc3N9IGZyb20gJy4uL3V0aWxzL3R5cGVzL2NsYXNzJztcblxuZXhwb3J0IGNsYXNzIENsYXNzQXBpIHtcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5odHRwID0gbmV3IEh0dHBDbGllbnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3NUcmVlKCk6IFByb21pc2U8R3JhZGVbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3MvdHJlZWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBncmFkZUxpc3QoKTogUHJvbWlzZTxHcmFkZVtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9ncmFkZWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzc0xpc3QoKTogUHJvbWlzZTxDbGFzc1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzc2ApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGFzc0xpc3RCeUdyYWRlSWQoZ3JhZGVJZDogbnVtYmVyKTogUHJvbWlzZTxDbGFzc1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy9ieUdyYWRlSWQvJHtncmFkZUlkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVHcmFkZShuZXdHcmFkZTogR3JhZGUpOiBQcm9taXNlPEdyYWRlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtjb25maWcuYXBpQmFzZVVybH0vZ3JhZGVgLCBuZXdHcmFkZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNsYXNzKG5ld0NsYXNzOiBDbGFzcyk6IFByb21pc2U8Q2xhc3M+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzc2AsIG5ld0NsYXNzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ2xhc3MoY2xhc3NJZDogbnVtYmVyLCBuZXdDbGFzczogQ2xhc3MpOiBQcm9taXNlPENsYXNzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy8ke2NsYXNzSWR9YCwgbmV3Q2xhc3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFkZShncmFkZUlkOiBudW1iZXIsIG5ld0dyYWRlOiBHcmFkZSk6IFByb21pc2U8R3JhZGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2dyYWRlLyR7Z3JhZGVJZH1gLCBuZXdHcmFkZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNsYXNzT3JkZXIoY2xhc3NJZHM6IG51bWJlcltdKTogUHJvbWlzZTxDbGFzcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3Mvb3JkZXJgLCBjbGFzc0lkcywpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcmFkZU9yZGVyKGdyYWRlSWRzOiBudW1iZXJbXSk6IFByb21pc2U8Q2xhc3M+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2dyYWRlL29yZGVyYCwgZ3JhZGVJZHMsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R3JhZGUoZ3JhZGVJZDogbnVtYmVyKTogUHJvbWlzZTxHcmFkZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vZ3JhZGUvJHtncmFkZUlkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDbGFzcyhjbGFzc0lkOiBudW1iZXIpOiBQcm9taXNlPENsYXNzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy8ke2NsYXNzSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE15Q2xhc3MoKTogUHJvbWlzZTxDbGFzc1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy9teWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoY2xhc3NJZDogbnVtYmVyKTogUHJvbWlzZTxudWxsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy8ke2NsYXNzSWR9YCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUdyYWRlKGdyYWRlSWQ6IG51bWJlcik6IFByb21pc2U8bnVsbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHtjb25maWcuYXBpQmFzZVVybH0vZ3JhZGUvJHtncmFkZUlkfWApO1xuICAgIH1cbn1cbiJdfQ==