import {ShareApi} from '../../../apis/share-api';
import {Pagination} from '../../../utils/types/pagination';
import {Share} from '../../../utils/types/share';
import {Utils} from '../../../utils/utils';
import {WxBindEvent} from '../../../utils/types/wx-bind-event';
import {IMyApp} from '../../../app';
import {GetProfile} from '../../../utils/login';
import {User} from '../../../utils/types/user';

const app = getApp<IMyApp>();
Page({
    data: {
        shareApi: <ShareApi>{},
        shares: <Share[]>[],
        pageData: <Pagination>{
            page: 1,
            size: 20
        },
        profile: <User>{}
    },
    onLoad() {
        this.setData({
            shareApi: new ShareApi(),
        });
    },
    onShow() {
        GetProfile(app, profile => {
            this.setData({
                profile: profile
            });
        });
        this.getShares();
    },
    getShares(page?: number) {
        page = page || this.data.pageData.page;
        this.data.shareApi.query(0, this.data.profile.id, page, this.data.pageData.size).then(result => {
            if (result.list) {
                Utils.shareListSerialize(.5, this.data.profile, ...result.list);
            }
            this.setData({
                shares: result.list || [],
                pageData: result.pagination
            });
        });
    },
    deleteShare(e: WxBindEvent) {
        console.log(e);
        wx.showModal({
            title: '删除分享',
            content: '确定要删除此分享吗?',
            confirmColor: '#c62828',
            success: (res) => {
                if (res.confirm) {
                    const shareId = e.currentTarget.dataset['shareId'];
                    this.data.shareApi.delete(shareId).then(() => {
                        this.setData!({
                            shares: this.data.shares.filter(i => i.id !== shareId)
                        });
                    });
                }
            }
        });
    }
});
