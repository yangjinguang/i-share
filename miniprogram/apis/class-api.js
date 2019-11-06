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
    ClassApi.prototype.delete = function (classId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/class/" + classId);
    };
    ClassApi.prototype.deleteGrade = function (gradeId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/grade/" + gradeId);
    };
    return ClassApi;
}());
exports.ClassApi = ClassApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MtYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3MtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLG9EQUFnRDtBQUloRDtJQUdJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sNEJBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGdCQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sNEJBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLFdBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSw0QkFBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLHFDQUFrQixHQUF6QixVQUEwQixPQUFlO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUksZUFBTSxDQUFDLFVBQVUseUJBQW9CLE9BQVMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixRQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixRQUFlO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUksZUFBTSxDQUFDLFVBQVUsV0FBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixPQUFlLEVBQUUsUUFBZTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSw4QkFBVyxHQUFsQixVQUFtQixPQUFlLEVBQUUsUUFBZTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFTSxtQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBa0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBYyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ3hFLENBQUM7SUFFTSxtQ0FBZ0IsR0FBdkIsVUFBd0IsUUFBa0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxpQkFBYyxFQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQ3hFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLE9BQWU7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQVMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSx5QkFBTSxHQUFiLFVBQWMsT0FBZTtRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGVBQVUsT0FBUyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNNLDhCQUFXLEdBQWxCLFVBQW1CLE9BQWU7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBSSxlQUFNLENBQUMsVUFBVSxlQUFVLE9BQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQTdERCxJQTZEQztBQTdEWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICcuLi91dGlscy9odHRwLWNsaWVudCc7XG5pbXBvcnQge0dyYWRlfSBmcm9tICcuLi91dGlscy90eXBlcy9ncmFkZSc7XG5pbXBvcnQge0NsYXNzfSBmcm9tICcuLi91dGlscy90eXBlcy9jbGFzcyc7XG5cbmV4cG9ydCBjbGFzcyBDbGFzc0FwaSB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsYXNzVHJlZSgpOiBQcm9taXNlPEdyYWRlW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2NsYXNzL3RyZWVgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ3JhZGVMaXN0KCk6IFByb21pc2U8R3JhZGVbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vZ3JhZGVgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3NMaXN0KCk6IFByb21pc2U8Q2xhc3NbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3NgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xhc3NMaXN0QnlHcmFkZUlkKGdyYWRlSWQ6IG51bWJlcik6IFByb21pc2U8Q2xhc3NbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3MvYnlHcmFkZUlkLyR7Z3JhZGVJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlR3JhZGUobmV3R3JhZGU6IEdyYWRlKTogUHJvbWlzZTxHcmFkZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2dyYWRlYCwgbmV3R3JhZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDbGFzcyhuZXdDbGFzczogQ2xhc3MpOiBQcm9taXNlPENsYXNzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3NgLCBuZXdDbGFzcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNsYXNzKGNsYXNzSWQ6IG51bWJlciwgbmV3Q2xhc3M6IENsYXNzKTogUHJvbWlzZTxDbGFzcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3MvJHtjbGFzc0lkfWAsIG5ld0NsYXNzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlR3JhZGUoZ3JhZGVJZDogbnVtYmVyLCBuZXdHcmFkZTogR3JhZGUpOiBQcm9taXNlPEdyYWRlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9ncmFkZS8ke2dyYWRlSWR9YCwgbmV3R3JhZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVDbGFzc09yZGVyKGNsYXNzSWRzOiBudW1iZXJbXSk6IFByb21pc2U8Q2xhc3M+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2NsYXNzL29yZGVyYCwgY2xhc3NJZHMsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlR3JhZGVPcmRlcihncmFkZUlkczogbnVtYmVyW10pOiBQcm9taXNlPENsYXNzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGAke2NvbmZpZy5hcGlCYXNlVXJsfS9ncmFkZS9vcmRlcmAsIGdyYWRlSWRzLCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyYWRlKGdyYWRlSWQ6IG51bWJlcik6IFByb21pc2U8R3JhZGU+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2dyYWRlLyR7Z3JhZGVJZH1gKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q2xhc3MoY2xhc3NJZDogbnVtYmVyKTogUHJvbWlzZTxDbGFzcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHtjb25maWcuYXBpQmFzZVVybH0vY2xhc3MvJHtjbGFzc0lkfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoY2xhc3NJZDogbnVtYmVyKTogUHJvbWlzZTxudWxsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jbGFzcy8ke2NsYXNzSWR9YCk7XG4gICAgfVxuICAgIHB1YmxpYyBkZWxldGVHcmFkZShncmFkZUlkOiBudW1iZXIpOiBQcm9taXNlPG51bGw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2dyYWRlLyR7Z3JhZGVJZH1gKTtcbiAgICB9XG59XG4iXX0=