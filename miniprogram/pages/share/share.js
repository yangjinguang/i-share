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
            utils_1.Utils.shareSerialize.apply(utils_1.Utils, [1, _this.data.profile].concat(result.list));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUE4QztBQUc5QywyQ0FBd0M7QUFFeEMsc0RBQWtEO0FBRWxELGtEQUE4QztBQUc5QywyQ0FBNkM7QUFFN0MsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUM7QUFFN0IsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFRLEVBQUU7UUFDakIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsVUFBVSxFQUFjLEVBQUU7UUFDMUIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsTUFBTSxFQUFXLEVBQUU7UUFDbkIsYUFBYSxFQUFjO1lBQ3ZCLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7U0FDWDtRQUNELGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsYUFBYSxFQUFTLEVBQUU7UUFDeEIsT0FBTyxFQUFXLEVBQUU7UUFDcEIsVUFBVSxFQUFZLEVBQUU7UUFDeEIsVUFBVSxFQUFFLENBQUM7UUFDYixhQUFhLEVBQUUsQ0FBQztLQUNuQjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLElBQUksb0JBQVEsRUFBRTtZQUN4QixVQUFVLEVBQUUsSUFBSSx3QkFBVSxFQUFFO1lBQzVCLFFBQVEsRUFBRSxJQUFJLG9CQUFRLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFBTixpQkFTQztRQVJHLGtCQUFVLENBQUMsR0FBRyxFQUFFLFVBQUMsT0FBTztZQUNwQixLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELFlBQVk7UUFBWixpQkFZQztRQVhHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDWixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNILEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFVBQVUsRUFBRSxVQUFVO2FBQ3pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsWUFBQyxJQUFZLEVBQUUsT0FBZ0I7UUFBeEMsaUJBeUJDO1FBeEJHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDMUMsT0FBTztTQUNWO1FBQ0QsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3QyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDN0YsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdEIsT0FBTzthQUNWO1lBQ0QsYUFBSyxDQUFDLGNBQWMsT0FBcEIsYUFBSyxHQUFnQixDQUFDLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLFNBQUssTUFBTSxDQUFDLElBQUksR0FBRTtZQUMzRCxJQUFJLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDcEMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QzthQUNKO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3hCO1lBRUQsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxhQUFhLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDbkMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsUUFBUSxZQUFDLE9BQWU7UUFBeEIsaUJBWUM7UUFYRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsS0FBSztZQUMzQyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE1BQU0sRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO29CQUMxQixJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFFO3dCQUNsQixDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztxQkFDbkI7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDO2FBQ0wsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsV0FBVyxZQUFDLE9BQWU7UUFBM0IsaUJBWUM7UUFYRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNqRCxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULE1BQU0sRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO29CQUMxQixJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxFQUFFO3dCQUNsQixDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztxQkFDekI7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDO2dCQUNGLGlCQUFpQixFQUFFLEtBQUs7YUFDM0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QscUJBQXFCLFlBQUMsQ0FBYztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN6QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxVQUFVLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQzFCLGFBQWEsRUFBRSxPQUFPO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxTQUFTLFlBQUMsQ0FBYztRQUF4QixpQkFLQztRQUpHLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxnQkFBZ0IsWUFBQyxDQUFjO1FBQzNCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNWLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsYUFBYSxFQUFFLFNBQVM7U0FDM0IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDVixpQkFBaUIsRUFBRSxLQUFLO1NBQzNCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxXQUFXLFlBQUMsQ0FBYztRQUExQixpQkFZQztRQVhHLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDVCxLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsK0JBQStCO2FBQ3pDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3RFLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGFBQWEsWUFBQyxDQUFjO1FBQTVCLGlCQXlCQztRQXhCRyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUNELEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDaEIsT0FBTyxFQUFFLFVBQUMsR0FBRztnQkFDVCxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLEtBQUssQ0FBQzt3QkFDRixLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ25FLEtBQUksQ0FBQyxPQUFRLENBQUM7Z0NBQ1YsTUFBTSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0NBQzFCLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxPQUFPLEVBQUU7d0NBQ2xCLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO3FDQUMzRDtvQ0FDRCxPQUFPLENBQUMsQ0FBQztnQ0FDYixDQUFDLENBQUM7NkJBQ0wsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxDQUFDO3dCQUNILE1BQU07aUJBQ2I7WUFDTCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTaGFyZUFwaX0gZnJvbSAnLi4vLi4vYXBpcy9zaGFyZS1hcGknO1xuaW1wb3J0IHtTaGFyZX0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMvc2hhcmUnO1xuaW1wb3J0IHtQYWdpbmF0aW9ufSBmcm9tICcuLi8uLi91dGlscy90eXBlcy9wYWdpbmF0aW9uJztcbmltcG9ydCB7VXRpbHN9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7V3hCaW5kRXZlbnR9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL3d4LWJpbmQtZXZlbnQnO1xuaW1wb3J0IHtDb21tZW50QXBpfSBmcm9tICcuLi8uLi9hcGlzL2NvbW1lbnQtYXBpJztcbmltcG9ydCB7Q2xhc3N9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzL2NsYXNzJztcbmltcG9ydCB7Q2xhc3NBcGl9IGZyb20gJy4uLy4uL2FwaXMvY2xhc3MtYXBpJztcbmltcG9ydCB7SU15QXBwfSBmcm9tICcuLi8uLi9hcHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuLi8uLi91dGlscy90eXBlcy91c2VyJztcbmltcG9ydCB7R2V0UHJvZmlsZX0gZnJvbSAnLi4vLi4vdXRpbHMvbG9naW4nO1xuXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpO1xuXG5QYWdlKHtcbiAgICBkYXRhOiB7XG4gICAgICAgIHByb2ZpbGU6IDxVc2VyPnt9LFxuICAgICAgICBzaGFyZUFwaTogPFNoYXJlQXBpPnt9LFxuICAgICAgICBjb21tZW50QXBpOiA8Q29tbWVudEFwaT57fSxcbiAgICAgICAgY2xhc3NBcGk6IDxDbGFzc0FwaT57fSxcbiAgICAgICAgc2hhcmVzOiA8U2hhcmVbXT5bXSxcbiAgICAgICAgc2hhcmVQYWdlRGF0YTogPFBhZ2luYXRpb24+e1xuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgIHNpemU6IDIwXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1lbnRJbnB1dFNob3duOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0ZWRTaGFyZTogPFNoYXJlPnt9LFxuICAgICAgICBjbGFzc2VzOiA8Q2xhc3NbXT5bXSxcbiAgICAgICAgY2xhc3Nlc0FycjogPHN0cmluZ1tdPltdLFxuICAgICAgICBjbGFzc0luZGV4OiAwLFxuICAgICAgICBmaWx0ZXJDbGFzc0lkOiAwXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBzaGFyZUFwaTogbmV3IFNoYXJlQXBpKCksXG4gICAgICAgICAgICBjb21tZW50QXBpOiBuZXcgQ29tbWVudEFwaSgpLFxuICAgICAgICAgICAgY2xhc3NBcGk6IG5ldyBDbGFzc0FwaSgpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICBHZXRQcm9maWxlKGFwcCwgKHByb2ZpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogcHJvZmlsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5nZXRDbGFzc1RyZWUoKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0U2hhcmVzKDEpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBnZXRDbGFzc1RyZWUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5jbGFzc0FwaS5jbGFzc0xpc3QoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBsZXQgY2xhc3Nlc0FyciA9IFsn5YWo6YOoJ107XG4gICAgICAgICAgICByZXN1bHQuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzQXJyLnB1c2goYy5ncmFkZU5hbWUgKyAnICcgKyBjLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBjbGFzc1RyZWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzQXJyOiBjbGFzc2VzQXJyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGdldFNoYXJlcyhwYWdlOiBudW1iZXIsIGNsYXNzSWQ/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zaGFyZVBhZ2VEYXRhLmxhc3QgJiYgcGFnZSA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc0lkID0gY2xhc3NJZCB8fCB0aGlzLmRhdGEuZmlsdGVyQ2xhc3NJZDtcbiAgICAgICAgcGFnZSA9IHBhZ2UgfHwgdGhpcy5kYXRhLnNoYXJlUGFnZURhdGEucGFnZTtcbiAgICAgICAgdGhpcy5kYXRhLnNoYXJlQXBpLnF1ZXJ5KHRoaXMuZGF0YS5maWx0ZXJDbGFzc0lkLCBwYWdlLCB0aGlzLmRhdGEuc2hhcmVQYWdlRGF0YS5zaXplKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxpc3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBVdGlscy5zaGFyZVNlcmlhbGl6ZSgxLCB0aGlzLmRhdGEucHJvZmlsZSwgLi4ucmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgbGV0IHNoYXJlcyA9IHRoaXMuZGF0YS5zaGFyZXMgfHwgW107XG4gICAgICAgICAgICBpZiAocGFnZSAmJiBwYWdlID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGlzdCAmJiByZXN1bHQubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXJlcyA9IHNoYXJlcy5jb25jYXQocmVzdWx0Lmxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hhcmVzID0gcmVzdWx0Lmxpc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2hhcmVzOiBzaGFyZXMsXG4gICAgICAgICAgICAgICAgc2hhcmVQYWdlRGF0YTogcmVzdWx0LnBhZ2luYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldExpa2VzKHNoYXJlSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkuZ2V0TGlrZXMoc2hhcmVJZCkudGhlbihsaWtlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNoYXJlczogdGhpcy5kYXRhLnNoYXJlcy5tYXAoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmlkID09PSBzaGFyZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmxpa2VkID0gbGlrZXMuZmluZEluZGV4KGogPT4gai5pZCA9PT0gdGhpcy5kYXRhLnByb2ZpbGUuaWQpID4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmxpa2VzID0gbGlrZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldENvbW1lbnRzKHNoYXJlSWQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGEuc2hhcmVBcGkuZ2V0Q29tbWVudHMoc2hhcmVJZCkudGhlbihjb21tZW50cyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNoYXJlczogdGhpcy5kYXRhLnNoYXJlcy5tYXAoaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpLmlkID09PSBzaGFyZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpLmNvbW1lbnRzID0gY29tbWVudHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0U2hvd246IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBiaW5kQ2xhc3NGaWx0ZXJDaGFuZ2UoZTogV3hCaW5kRXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5kYXRhLmNsYXNzSW5kZXggPT09IGUuZGV0YWlsLnZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsYXNzSWQgPSAwO1xuICAgICAgICBpZiAoZS5kZXRhaWwudmFsdWUgPiAwKSB7XG4gICAgICAgICAgICBjbGFzc0lkID0gdGhpcy5kYXRhLmNsYXNzZXNbZS5kZXRhaWwudmFsdWUgLSAxXS5pZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgY2xhc3NJbmRleDogZS5kZXRhaWwudmFsdWUsXG4gICAgICAgICAgICBmaWx0ZXJDbGFzc0lkOiBjbGFzc0lkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldFNoYXJlcygxLCBjbGFzc0lkKTtcbiAgICB9LFxuICAgIHNoYXJlTGlrZShlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBsZXQgc2hhcmVJZCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0WydzaGFyZUlkJ107XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5saWtlKHNoYXJlSWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRMaWtlcyhzaGFyZUlkKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaG93Q29tbWVudElucHV0KGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpbmRTaGFyZSA9IHRoaXMuZGF0YS5zaGFyZXMuZmluZChpID0+IGkuaWQgPT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRbJ3NoYXJlSWQnXSk7XG4gICAgICAgIGlmICghZmluZFNoYXJlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgICAgICBjb21tZW50SW5wdXRTaG93bjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkU2hhcmU6IGZpbmRTaGFyZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoaWRlQ29tbWVudElucHV0KCkge1xuICAgICAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgICAgICAgIGNvbW1lbnRJbnB1dFNob3duOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzZW5kQ29tbWVudChlOiBXeEJpbmRFdmVudCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoYXJlID0gdGhpcy5kYXRhLnNlbGVjdGVkU2hhcmU7XG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGFyZSkge1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+acquefpemUmeivrycsXG4gICAgICAgICAgICAgICAgaW1hZ2U6ICcvaWNvbnMvZXhjbGFtYXRpb24tY2lyY2xlLnBuZydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zaGFyZUFwaS5jb21tZW50KHNlbGVjdGVkU2hhcmUuaWQsIGUuZGV0YWlsLnZhbHVlWydib2R5J10pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21tZW50cyhzZWxlY3RlZFNoYXJlLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjb21tZW50QWN0aW9uKGU6IFd4QmluZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHNoYXJlSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnc2hhcmVJZCddO1xuICAgICAgICBjb25zdCBjb21tZW50SWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnY29tbWVudElkJ107XG4gICAgICAgIGlmICghc2hhcmVJZCB8fCAhY29tbWVudElkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICAgIGl0ZW1MaXN0OiBbJ+aSpOWbniddLFxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocmVzLnRhcEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5jb21tZW50QXBpLmRlbGV0ZShlLmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnY29tbWVudElkJ10pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFyZXM6IHRoaXMuZGF0YS5zaGFyZXMubWFwKGkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuaWQgPT09IHNoYXJlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLmNvbW1lbnRzID0gaS5jb21tZW50cy5maWx0ZXIoaiA9PiBqLmlkICE9PSBjb21tZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRNb3JlKCkge1xuICAgICAgICB0aGlzLmdldFNoYXJlcyh0aGlzLmRhdGEuc2hhcmVQYWdlRGF0YS5wYWdlICsgMSk7XG4gICAgfVxufSk7XG4iXX0=