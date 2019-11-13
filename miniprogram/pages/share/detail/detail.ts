import {ShareApi} from '../../../apis/share-api';
import {GetProfile} from '../../../utils/login';
import {IMyApp} from '../../../app';
import {CommentApi} from '../../../apis/comment-api';
import {ClassApi} from '../../../apis/class-api';
import {Share} from '../../../utils/types/share';
import {User} from '../../../utils/types/user';
import {Utils} from '../../../utils/utils';

const app = getApp<IMyApp>();

Page({
    data: {
        shareApi: <ShareApi>{},
        commentApi: <CommentApi>{},
        classApi: <ClassApi>{},
        share: <Share>{},
        profile: <User>{},
        shareId: 0
    },
    onLoad(q: any) {
        this.setData({
            shareApi: new ShareApi(),
            commentApi: new CommentApi(),
            classApi: new ClassApi(),
            shareId: q['id']
        });
    },
    onShow() {
        GetProfile(app, (profile) => {
            this.setData({
                profile: profile,
            });
            this.getShare();
        });
    },
    getShare() {
        this.data.shareApi.getOne(this.data.shareId).then(result => {
            Utils.shareSerialize(1, this.data.profile, result);
            this.setData({
                share: result
            });
            console.log(this.data);
        });
    },
    getLikes() {
        this.data.shareApi.getLikes(this.data.share.id).then(likes => {
            let share = this.data.share;
            share.likes = likes;
            share.liked = likes.findIndex(j => j.id === this.data.profile.id) > -1;
            this.setData({
                share: share
            });
        });
    },
    getComments() {
        this.data.shareApi.getComments(this.data.share.id).then(comments => {
            let share = this.data.share;
            share.comments = comments;
            this.setData({
                share: share,
                commentInputShown: false
            });
        });
    }
});
