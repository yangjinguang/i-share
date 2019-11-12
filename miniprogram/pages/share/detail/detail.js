"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var share_api_1 = require("../../../apis/share-api");
var login_1 = require("../../../utils/login");
var comment_api_1 = require("../../../apis/comment-api");
var class_api_1 = require("../../../apis/class-api");
var utils_1 = require("../../../utils/utils");
var app = getApp();
Page({
    data: {
        shareApi: {},
        commentApi: {},
        classApi: {},
        share: {},
        profile: {},
        shareId: 0
    },
    onLoad: function (q) {
        this.setData({
            shareApi: new share_api_1.ShareApi(),
            commentApi: new comment_api_1.CommentApi(),
            classApi: new class_api_1.ClassApi(),
            shareId: q['id']
        });
    },
    onShow: function () {
        var _this = this;
        login_1.GetProfile(app, function (profile) {
            _this.setData({
                profile: profile,
            });
            _this.getShare();
        });
    },
    getShare: function () {
        var _this = this;
        this.data.shareApi.getOne(this.data.shareId).then(function (result) {
            utils_1.Utils.shareSerialize(1, _this.data.profile, result);
            _this.setData({
                share: result
            });
        });
    },
    getLikes: function () {
        var _this = this;
        this.data.shareApi.getLikes(this.data.share.id).then(function (likes) {
            var share = _this.data.share;
            share.likes = likes;
            share.liked = likes.findIndex(function (j) { return j.id === _this.data.profile.id; }) > -1;
            _this.setData({
                share: share
            });
        });
    },
    getComments: function () {
        var _this = this;
        this.data.shareApi.getComments(this.data.share.id).then(function (comments) {
            var share = _this.data.share;
            share.comments = comments;
            _this.setData({
                share: share,
                commentInputShown: false
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWlEO0FBQ2pELDhDQUFnRDtBQUVoRCx5REFBcUQ7QUFDckQscURBQWlEO0FBR2pELDhDQUEyQztBQUUzQyxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQztBQUU3QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQVksRUFBRTtRQUN0QixVQUFVLEVBQWMsRUFBRTtRQUMxQixRQUFRLEVBQVksRUFBRTtRQUN0QixLQUFLLEVBQVMsRUFBRTtRQUNoQixPQUFPLEVBQVEsRUFBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsTUFBTSxZQUFDLENBQU07UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtZQUN4QixVQUFVLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7WUFDeEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFBTixpQkFPQztRQU5HLGtCQUFVLENBQUMsR0FBRyxFQUFFLFVBQUMsT0FBTztZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxRQUFRO1FBQVIsaUJBT0M7UUFORyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BELGFBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLE1BQU07YUFDaEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsUUFBUTtRQUFSLGlCQVNDO1FBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDdEQsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDcEIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQTdCLENBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2RSxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULEtBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsV0FBVztRQUFYLGlCQVNDO1FBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDNUQsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDNUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxLQUFLLEVBQUUsS0FBSztnQkFDWixpQkFBaUIsRUFBRSxLQUFLO2FBQzNCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2hhcmVBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvc2hhcmUtYXBpJztcbmltcG9ydCB7R2V0UHJvZmlsZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbG9naW4nO1xuaW1wb3J0IHtJTXlBcHB9IGZyb20gJy4uLy4uLy4uL2FwcCc7XG5pbXBvcnQge0NvbW1lbnRBcGl9IGZyb20gJy4uLy4uLy4uL2FwaXMvY29tbWVudC1hcGknO1xuaW1wb3J0IHtDbGFzc0FwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy9jbGFzcy1hcGknO1xuaW1wb3J0IHtTaGFyZX0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvc2hhcmUnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy91c2VyJztcbmltcG9ydCB7VXRpbHN9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3V0aWxzJztcblxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKTtcblxuUGFnZSh7XG4gICAgZGF0YToge1xuICAgICAgICBzaGFyZUFwaTogPFNoYXJlQXBpPnt9LFxuICAgICAgICBjb21tZW50QXBpOiA8Q29tbWVudEFwaT57fSxcbiAgICAgICAgY2xhc3NBcGk6IDxDbGFzc0FwaT57fSxcbiAgICAgICAgc2hhcmU6IDxTaGFyZT57fSxcbiAgICAgICAgcHJvZmlsZTogPFVzZXI+e30sXG4gICAgICAgIHNoYXJlSWQ6IDBcbiAgICB9LFxuICAgIG9uTG9hZChxOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHNoYXJlQXBpOiBuZXcgU2hhcmVBcGkoKSxcbiAgICAgICAgICAgIGNvbW1lbnRBcGk6IG5ldyBDb21tZW50QXBpKCksXG4gICAgICAgICAgICBjbGFzc0FwaTogbmV3IENsYXNzQXBpKCksXG4gICAgICAgICAgICBzaGFyZUlkOiBxWydpZCddXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICBHZXRQcm9maWxlKGFwcCwgKHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXRTaGFyZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFNoYXJlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkuZ2V0T25lKHRoaXMuZGF0YS5zaGFyZUlkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBVdGlscy5zaGFyZVNlcmlhbGl6ZSgxLCB0aGlzLmRhdGEucHJvZmlsZSwgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2hhcmU6IHJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0TGlrZXMoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5nZXRMaWtlcyh0aGlzLmRhdGEuc2hhcmUuaWQpLnRoZW4obGlrZXMgPT4ge1xuICAgICAgICAgICAgbGV0IHNoYXJlID0gdGhpcy5kYXRhLnNoYXJlO1xuICAgICAgICAgICAgc2hhcmUubGlrZXMgPSBsaWtlcztcbiAgICAgICAgICAgIHNoYXJlLmxpa2VkID0gbGlrZXMuZmluZEluZGV4KGogPT4gai5pZCA9PT0gdGhpcy5kYXRhLnByb2ZpbGUuaWQpID4gLTE7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNoYXJlOiBzaGFyZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5nZXRDb21tZW50cyh0aGlzLmRhdGEuc2hhcmUuaWQpLnRoZW4oY29tbWVudHMgPT4ge1xuICAgICAgICAgICAgbGV0IHNoYXJlID0gdGhpcy5kYXRhLnNoYXJlO1xuICAgICAgICAgICAgc2hhcmUuY29tbWVudHMgPSBjb21tZW50cztcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2hhcmU6IHNoYXJlLFxuICAgICAgICAgICAgICAgIGNvbW1lbnRJbnB1dFNob3duOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19