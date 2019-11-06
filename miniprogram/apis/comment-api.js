"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("../utils/http-client");
var config_1 = require("../utils/config");
var CommentApi = (function () {
    function CommentApi() {
        this.http = new http_client_1.HttpClient();
    }
    CommentApi.prototype.delete = function (commentId) {
        return this.http.delete(config_1.config.apiBaseUrl + "/comments/" + commentId);
    };
    return CommentApi;
}());
exports.CommentApi = CommentApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tZW50LWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFnRDtBQUNoRCwwQ0FBdUM7QUFFdkM7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLDJCQUFNLEdBQWIsVUFBYyxTQUFpQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLGVBQU0sQ0FBQyxVQUFVLGtCQUFhLFNBQVcsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4uL3V0aWxzL2h0dHAtY2xpZW50JztcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi91dGlscy9jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgQ29tbWVudEFwaSB7XG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaHR0cCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZShjb21tZW50SWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKGAke2NvbmZpZy5hcGlCYXNlVXJsfS9jb21tZW50cy8ke2NvbW1lbnRJZH1gKTtcbiAgICB9XG59Il19