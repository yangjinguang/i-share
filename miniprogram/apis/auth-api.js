"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../utils/config");
var AuthApi = (function () {
    function AuthApi() {
    }
    AuthApi.prototype.auth = function (authPostData) {
        return new Promise(function (resolve, reject) {
            wx.request({
                url: config_1.config.apiBaseUrl + "/auth/login",
                method: 'POST',
                data: authPostData,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    var authRes = res.data;
                    resolve(authRes);
                },
                fail: function (err) {
                    reject(err);
                }
            });
        });
    };
    return AuthApi;
}());
exports.AuthApi = AuthApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRoLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUF1QztBQVV2QztJQUVJO0lBQ0EsQ0FBQztJQUVNLHNCQUFJLEdBQVgsVUFBWSxZQUEwQjtRQUNsQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDUCxHQUFHLEVBQUssZUFBTSxDQUFDLFVBQVUsZ0JBQWE7Z0JBQ3RDLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxZQUFZO2dCQUNsQixNQUFNLEVBQUU7b0JBQ0osY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsT0FBTyxFQUFFLFVBQUMsR0FBRztvQkFDVCxJQUFNLE9BQU8sR0FBSSxHQUFHLENBQUMsSUFBcUIsQ0FBQztvQkFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixDQUFDO2dCQUNELElBQUksRUFBRSxVQUFDLEdBQUc7b0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUwsY0FBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0F1dGhSZXNwb25zZX0gZnJvbSAnLi4vdXRpbHMvdHlwZXMvYXV0aC1yZXNwb25zZSc7XG5pbXBvcnQge2NvbmZpZ30gZnJvbSAnLi4vdXRpbHMvY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRoUG9zdERhdGEge1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBlbmNyeXB0ZWREYXRhOiBzdHJpbmc7XG4gICAgaXY6IHN0cmluZztcbiAgICByYXdEYXRhOiBzdHJpbmc7XG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRoQXBpIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhdXRoKGF1dGhQb3N0RGF0YTogQXV0aFBvc3REYXRhKTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYCR7Y29uZmlnLmFwaUJhc2VVcmx9L2F1dGgvbG9naW5gLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGF1dGhQb3N0RGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXV0aFJlcyA9IChyZXMuZGF0YSBhcyBBdXRoUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGF1dGhSZXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbiJdfQ==