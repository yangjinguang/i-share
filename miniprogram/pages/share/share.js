"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var share_api_1 = require("../../apis/share-api");
var utils_1 = require("../../utils/utils");
var comment_api_1 = require("../../apis/comment-api");
var class_api_1 = require("../../apis/class-api");
var login_1 = require("../../utils/login");
var app = getApp();
Page({
    data: {
        profile: {},
        shareApi: {},
        commentApi: {},
        classApi: {},
        shares: [],
        sharePageData: {
            page: 1,
            size: 20
        },
        commentInputShown: false,
        selectedShare: {},
        classes: [],
        classesArr: [],
        classIndex: 0,
        filterClassId: 0
    },
    onLoad: function () {
        this.setData({
            shareApi: new share_api_1.ShareApi(),
            commentApi: new comment_api_1.CommentApi(),
            classApi: new class_api_1.ClassApi()
        });
    },
    onShow: function () {
        var _this = this;
        login_1.GetProfile(app, function (profile) {
            _this.setData({
                profile: profile,
            });
            _this.getClassTree();
            _this.getShares(1);
        });
    },
    getClassTree: function () {
        var _this = this;
        this.data.classApi.classList().then(function (result) {
            var classesArr = ['全部'];
            result.forEach(function (c) {
                classesArr.push(c.gradeName + ' ' + c.name);
            });
            _this.setData({
                classes: result,
                classTree: result,
                classesArr: classesArr
            });
        });
    },
    getShares: function (page, classId) {
        var _this = this;
        if (this.data.sharePageData.last && page > 1) {
            return;
        }
        classId = classId || this.data.filterClassId;
        page = page || this.data.sharePageData.page;
        this.data.shareApi.query(this.data.filterClassId, page, this.data.sharePageData.size).then(function (result) {
            if (result.list === null) {
                return;
            }
            utils_1.Utils.shareListSerialize.apply(utils_1.Utils, [1, _this.data.profile].concat(result.list));
            var shares = _this.data.shares || [];
            if (page && page > 1) {
                if (result.list && result.list.length > 0) {
                    shares = shares.concat(result.list);
                }
            }
            else {
                shares = result.list;
            }
            _this.setData({
                shares: shares,
                sharePageData: result.pagination
            });
        });
    },
    getLikes: function (shareId) {
        var _this = this;
        this.data.shareApi.getLikes(shareId).then(function (likes) {
            _this.setData({
                shares: _this.data.shares.map(function (i) {
                    if (i.id === shareId) {
                        i.liked = likes.findIndex(function (j) { return j.id === _this.data.profile.id; }) > -1;
                        i.likes = likes;
                    }
                    return i;
                })
            });
        });
    },
    getComments: function (shareId) {
        var _this = this;
        this.data.shareApi.getComments(shareId).then(function (comments) {
            _this.setData({
                shares: _this.data.shares.map(function (i) {
                    if (i.id === shareId) {
                        i.comments = comments;
                    }
                    return i;
                }),
                commentInputShown: false
            });
        });
    },
    bindClassFilterChange: function (e) {
        console.log(e.detail.value);
        if (this.data.classIndex === e.detail.value) {
            return;
        }
        var classId = 0;
        if (e.detail.value > 0) {
            classId = this.data.classes[e.detail.value - 1].id;
        }
        this.setData({
            classIndex: e.detail.value,
            filterClassId: classId
        });
        this.getShares(1, classId);
    },
    shareLike: function (e) {
        var _this = this;
        var shareId = e.currentTarget.dataset['shareId'];
        this.data.shareApi.like(shareId).then(function () {
            _this.getLikes(shareId);
        });
    },
    showCommentInput: function (e) {
        var findShare = this.data.shares.find(function (i) { return i.id == e.currentTarget.dataset['shareId']; });
        if (!findShare) {
            return;
        }
        this.setData({
            commentInputShown: true,
            selectedShare: findShare,
        });
    },
    hideCommentInput: function () {
        this.setData({
            commentInputShown: false,
        });
    },
    sendComment: function (e) {
        var _this = this;
        var selectedShare = this.data.selectedShare;
        if (!selectedShare) {
            wx.showToast({
                title: '未知错误',
                image: '/icons/exclamation-circle.png'
            });
            return;
        }
        this.data.shareApi.comment(selectedShare.id, e.detail.value['body']).then(function () {
            _this.getComments(selectedShare.id);
        });
    },
    commentAction: function (e) {
        var _this = this;
        var shareId = e.currentTarget.dataset['shareId'];
        var commentId = e.currentTarget.dataset['commentId'];
        if (!shareId || !commentId) {
            return;
        }
        wx.showActionSheet({
            itemList: ['撤回'],
            success: function (res) {
                switch (res.tapIndex) {
                    case 0:
                        _this.data.commentApi.delete(e.currentTarget.dataset['commentId']).then(function () {
                            _this.setData({
                                shares: _this.data.shares.map(function (i) {
                                    if (i.id === shareId) {
                                        i.comments = i.comments.filter(function (j) { return j.id !== commentId; });
                                    }
                                    return i;
                                })
                            });
                        });
                        break;
                }
            }
        });
    },
    getMore: function () {
        this.getShares(this.data.sharePageData.page + 1);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUE4QztBQUc5QywyQ0FBd0M7QUFFeEMsc0RBQWtEO0FBRWxELGtEQUE4QztBQUc5QywyQ0FBNkM7QUFFN0MsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFFN0IsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFRLEVBQUU7UUFDakIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsVUFBVSxFQUFjLEVBQUU7UUFDMUIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsTUFBTSxFQUFXLEVBQUU7UUFDbkIsYUFBYSxFQUFjO1lBQ3ZCLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWDtRQUNELGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsYUFBYSxFQUFTLEVBQUU7UUFDeEIsT0FBTyxFQUFXLEVBQUU7UUFDcEIsVUFBVSxFQUFZLEVBQUU7UUFDeEIsVUFBVSxFQUFFLENBQUM7UUFDYixhQUFhLEVBQUUsQ0FBQztLQUNuQjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtZQUN4QixVQUFVLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFBTixpQkFTQztRQVJHLGtCQUFVLENBQUMsR0FBRyxFQUFFLFVBQUMsT0FBTztZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FB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QUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFsQixDQUFrQixDQUFDLENBQUM7cUNBQzNEO29DQUNELE9BQU8sQ0FBQyxDQUFDO2dDQUNiLENBQUMsQ0FBQzs2QkFDTCxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsTUFBTTtpQkFDYjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NoYXJlQXBpfSBmcm9tICcuLi8uLi9hcGlzL3NoYXJlLWFwaSc7XG5pbXBvcnQge1NoYXJlfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9zaGFyZSc7XG5pbXBvcnQge1BhZ2luYXRpb259IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3BhZ2luYXRpb24nO1xuaW1wb3J0IHtVdGlsc30gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtXeEJpbmRFdmVudH0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvd3gtYmluZC1ldmVudCc7XG5pbXBvcnQge0NvbW1lbnRBcGl9IGZyb20gJy4uLy4uL2FwaXMvY29tbWVudC1hcGknO1xuaW1wb3J0IHtDbGFzc30gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvY2xhc3MnO1xuaW1wb3J0IHtDbGFzc0FwaX0gZnJvbSAnLi4vLi4vYXBpcy9jbGFzcy1hcGknO1xuaW1wb3J0IHtJTXlBcHB9IGZyb20gJy4uLy4uL2FwcCc7XG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3VzZXInO1xuaW1wb3J0IHtHZXRQcm9maWxlfSBmcm9tICcuLi8uLi91dGlscy9sb2dpbic7XG5cbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KCk7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgcHJvZmlsZTogPFVzZXI+e30sXG4gICAgICAgIHNoYXJlQXBpOiA8U2hhcmVBcGk+e30sXG4gICAgICAgIGNvbW1lbnRBcGk6IDxDb21tZW50QXBpPnt9LFxuICAgICAgICBjbGFzc0FwaTogPENsYXNzQXBpPnt9LFxuICAgICAgICBzaGFyZXM6IDxTaGFyZVtdPltdLFxuICAgICAgICBzaGFyZVBhZ2VEYXRhOiA8UGFnaW5hdGlvbj57XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgc2l6ZTogMjBcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWVudElucHV0U2hvd246IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZFNoYXJlOiA8U2hhcmU+e30sXG4gICAgICAgIGNsYXNzZXM6IDxDbGFzc1tdPltdLFxuICAgICAgICBjbGFzc2VzQXJyOiA8c3RyaW5nW10+W10sXG4gICAgICAgIGNsYXNzSW5kZXg6IDAsXG4gICAgICAgIGZpbHRlckNsYXNzSWQ6IDBcbiAgICB9LFxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHNoYXJlQXBpOiBuZXcgU2hhcmVBcGkoKSxcbiAgICAgICAgICAgIGNvbW1lbnRBcGk6IG5ldyBDb21tZW50QXBpKCksXG4gICAgICAgICAgICBjbGFzc0FwaTogbmV3IENsYXNzQXBpKClcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvblNob3coKSB7XG4gICAgICAgIEdldFByb2ZpbGUoYXBwLCAocHJvZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBwcm9maWxlOiBwcm9maWxlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmdldENsYXNzVHJlZSgpO1xuICAgICAgICAgICAgdGhpcy5nZXRTaGFyZXMoMSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGdldENsYXNzVHJlZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsYXNzQXBpLmNsYXNzTGlzdCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGxldCBjbGFzc2VzQXJyID0gWyflhajpg6gnXTtcbiAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgICAgIGNsYXNzZXNBcnIucHVzaChjLmdyYWRlTmFtZSArICcgJyArIGMubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgY2xhc3NlczogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGNsYXNzVHJlZTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGNsYXNzZXNBcnI6IGNsYXNzZXNBcnJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZ2V0U2hhcmVzKHBhZ2U6IG51bWJlciwgY2xhc3NJZD86IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnNoYXJlUGFnZURhdGEubGFzdCAmJiBwYWdlID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzSWQgPSBjbGFzc0lkIHx8IHRoaXMuZGF0YS5maWx0ZXJDbGFzc0lkO1xuICAgICAgICBwYWdlID0gcGFnZSB8fCB0aGlzLmRhdGEuc2hhcmVQYWdlRGF0YS5wYWdlO1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkucXVlcnkodGhpcy5kYXRhLmZpbHRlckNsYXNzSWQsIHBhZ2UsIHRoaXMuZGF0YS5zaGFyZVBhZ2VEYXRhLnNpemUpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubGlzdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFV0aWxzLnNoYXJlTGlzdFNlcmlhbGl6ZSgxLCB0aGlzLmRhdGEucHJvZmlsZSwgLi4ucmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgbGV0IHNoYXJlcyA9IHRoaXMuZGF0YS5zaGFyZXMgfHwgW107XG4gICAgICAgICAgICBpZiAocGFnZSAmJiBwYWdlID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGlzdCAmJiByZXN1bHQubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXJlcyA9IHNoYXJlcy5jb25jYXQocmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hhcmVzID0gcmVzdWx0Lmxpc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2hhcmVzOiBzaGFyZXMsXG4gICAgICAgICAgICAgICAgc2hhcmVQYWdlRGF0YTogcmVzdWx0LnBhZ2luYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldExpa2VzKHNoYXJlSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkuZ2V0TGlrZXMoc2hhcmVJZCkudGhlbihsaWtlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNoYXJlczogdGhpcy5kYXRhLnNoYXJlcy5tYXAoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmlkID09PSBzaGFyZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmxpa2VkID0gbGlrZXMuZmluZEluZGV4KGogPT4gai5pZCA9PT0gdGhpcy5kYXRhLnByb2ZpbGUuaWQpID4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmxpa2VzID0gbGlrZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbW1lbnRzKHNoYXJlSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkuZ2V0Q29tbWVudHMoc2hhcmVJZCkudGhlbihjb21tZW50cyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNoYXJlczogdGhpcy5kYXRhLnNoYXJlcy5tYXAoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmlkID09PSBzaGFyZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmNvbW1lbnRzID0gY29tbWVudHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0U2hvd246IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2xhc3NGaWx0ZXJDaGFuZ2UoZTogV3hCaW5kRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmNsYXNzSW5kZXggPT09IGUuZGV0YWlsLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsYXNzSWQgPSAwO1xuICAgICAgICBpZiAoZS5kZXRhaWwudmFsdWUgPiAwKSB7XG4gICAgICAgICAgICBjbGFzc0lkID0gdGhpcy5kYXRhLmNsYXNzZXNbZS5kZXRhaWwudmFsdWUgLSAxXS5pZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgY2xhc3NJbmRleDogZS5kZXRhaWwudmFsdWUsXG4gICAgICAgICAgICBmaWx0ZXJDbGFzc0lkOiBjbGFzc0lkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldFNoYXJlcygxLCBjbGFzc0lkKTtcbiAgICB9LFxuICAgIHNoYXJlTGlrZShlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBsZXQgc2hhcmVJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0WydzaGFyZUlkJ107XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5saWtlKHNoYXJlSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRMaWtlcyhzaGFyZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaG93Q29tbWVudElucHV0KGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpbmRTaGFyZSA9IHRoaXMuZGF0YS5zaGFyZXMuZmluZChpID0+IGkuaWQgPT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRbJ3NoYXJlSWQnXSk7XG4gICAgICAgIGlmICghZmluZFNoYXJlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICBjb21tZW50SW5wdXRTaG93bjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkU2hhcmU6IGZpbmRTaGFyZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoaWRlQ29tbWVudElucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIGNvbW1lbnRJbnB1dFNob3duOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZW5kQ29tbWVudChlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoYXJlID0gdGhpcy5kYXRhLnNlbGVjdGVkU2hhcmU7XG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGFyZSkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+acquefpemUmeivrycsXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcvaWNvbnMvZXhjbGFtYXRpb24tY2lyY2xlLnBuZydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5jb21tZW50KHNlbGVjdGVkU2hhcmUuaWQsIGUuZGV0YWlsLnZhbHVlWydib2R5J10pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21tZW50cyhzZWxlY3RlZFNoYXJlLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21tZW50QWN0aW9uKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNoYXJlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnc2hhcmVJZCddO1xuICAgICAgICBjb25zdCBjb21tZW50SWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnY29tbWVudElkJ107XG4gICAgICAgIGlmICghc2hhcmVJZCB8fCAhY29tbWVudElkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBbJ+aSpOWbniddLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzLnRhcEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jb21tZW50QXBpLmRlbGV0ZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnY29tbWVudElkJ10pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFyZXM6IHRoaXMuZGF0YS5zaGFyZXMubWFwKGkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuaWQgPT09IHNoYXJlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLmNvbW1lbnRzID0gaS5jb21tZW50cy5maWx0ZXIoaiA9PiBqLmlkICE9PSBjb21tZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNb3JlKCkge1xuICAgICAgICB0aGlzLmdldFNoYXJlcyh0aGlzLmRhdGEuc2hhcmVQYWdlRGF0YS5wYWdlICsgMSk7XG4gICAgfVxufSk7XG4iXX0=