import {ShareApi} from '../../apis/share-api';
import {Share} from '../../utils/types/share';
import {Pagination} from '../../utils/types/pagination';
import {Utils} from '../../utils/utils';
import {WxBindEvent} from '../../utils/types/wx-bind-event';
import {CommentApi} from '../../apis/comment-api';
import {Class} from '../../utils/types/class';
import {ClassApi} from '../../apis/class-api';
import {IMyApp} from '../../app';
import {User} from '../../utils/types/user';
import {GetProfile} from '../../utils/login';

const app = getApp<IMyApp>();

Page({
    data: {
        profile: <User>{},
        shareApi: <ShareApi>{},
        commentApi: <CommentApi>{},
        classApi: <ClassApi>{},
        shares: <Share[]>[],
        sharePageData: <Pagination>{
            page: 1,
            size: 20
        },
        commentInputShown: false,
        selectedShare: <Share>{},
        classes: <Class[]>[],
        classesArr: <string[]>[],
        classIndex: 0,
        filterClassId: 0
    },
    onLoad() {
        this.setData({
            shareApi: new ShareApi(),
            commentApi: new CommentApi(),
            classApi: new ClassApi()
        });
    },
    onShow() {
        GetProfile(app, (profile) => {
            this.setData({
                profile: profile,
            });
            this.getClassTree();
            this.getShares(1);
        });

    },

    getClassTree() {
        this.data.classApi.classList().then(result => {
            let classesArr = ['全部'];
            result.forEach(c => {
                classesArr.push(c.gradeName + ' ' + c.name);
            });
            this.setData({
                classes: result,
                classTree: result,
                classesArr: classesArr
            });
        });
    },

    getShares(page: number, classId?: number) {
        if (this.data.sharePageData.last && page > 1) {
            return;
        }
        classId = classId || this.data.filterClassId;
        page = page || this.data.sharePageData.page;
        this.data.shareApi.query(this.data.filterClassId, 0, page, this.data.sharePageData.size).then(result => {
            if (result.list === null) {
                return;
            }
            Utils.shareListSerialize(1, this.data.profile, ...result.list);
            let shares = this.data.shares || [];
            if (page && page > 1) {
                if (result.list && result.list.length > 0) {
                    shares = shares.concat(result.list);
                }
            } else {
                shares = result.list;
            }

            this.setData({
                shares: shares,
                sharePageData: result.pagination
            });
        });
    },
    getLikes(shareId: number) {
        this.data.shareApi.getLikes(shareId).then(likes => {
            this.setData({
                shares: this.data.shares.map(i => {
                    if (i.id === shareId) {
                        i.liked = likes.findIndex(j => j.id === this.data.profile.id) > -1;
                        i.likes = likes;
                    }
                    return i;
                })
            });
        });
    },
    getComments(shareId: number) {
        this.data.shareApi.getComments(shareId).then(comments => {
            this.setData({
                shares: this.data.shares.map(i => {
                    if (i.id === shareId) {
                        i.comments = comments;
                    }
                    return i;
                }),
                commentInputShown: false
            });
        });
    },
    bindClassFilterChange(e: WxBindEvent) {
        console.log(e.detail.value);
        if (this.data.classIndex === e.detail.value) {
            return;
        }
        let classId = 0;
        if (e.detail.value > 0) {
            classId = this.data.classes[e.detail.value - 1].id;
        }
        this.setData({
            classIndex: e.detail.value,
            filterClassId: classId
        });
        this.getShares(1, classId);
    },
    shareLike(e: WxBindEvent) {
        let shareId = e.currentTarget.dataset['shareId'];
        this.data.shareApi.like(shareId).then(() => {
            this.getLikes(shareId);
        });
    },
    showCommentInput(e: WxBindEvent) {
        const findShare = this.data.shares.find(i => i.id == e.currentTarget.dataset['shareId']);
        if (!findShare) {
            return;
        }
        this.setData!({
            commentInputShown: true,
            selectedShare: findShare,
        });
    },
    hideCommentInput() {
        this.setData!({
            commentInputShown: false,
        });
    },
    sendComment(e: WxBindEvent) {
        const selectedShare = this.data.selectedShare;
        if (!selectedShare) {
            wx.showToast({
                title: '未知错误',
                image: '/icons/exclamation-circle.png'
            });
            return;
        }
        this.data.shareApi.comment(selectedShare.id, e.detail.value['body']).then(() => {
            this.getComments(selectedShare.id);
        });
    },
    commentAction(e: WxBindEvent) {
        const shareId = e.currentTarget.dataset['shareId'];
        const commentId = e.currentTarget.dataset['commentId'];
        if (!shareId || !commentId) {
            return;
        }
        wx.showActionSheet({
            itemList: ['撤回'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        this.data.commentApi.delete(e.currentTarget.dataset['commentId']).then(() => {
                            this.setData!({
                                shares: this.data.shares.map(i => {
                                    if (i.id === shareId) {
                                        i.comments = i.comments.filter(j => j.id !== commentId);
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
    getMore() {
        this.getShares(this.data.sharePageData.page + 1);
    }
});
