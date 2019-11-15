// index.ts
// 获取应用实例
import {IMyApp} from '../../app';
import {User} from '../../utils/types/user';
import {GetProfile} from '../../utils/login';
import {SettingsApi} from '../../apis/settings-api';
import {ItemApi} from '../../apis/item-api';
import {ShareApi} from '../../apis/share-api';
import {Banner} from '../../utils/types/banner';
import {Item} from '../../utils/types/item';
import {Share} from '../../utils/types/share';
import {Utils} from '../../utils/utils';

const app = getApp<IMyApp>();
Page({
    data: {
        settingsApi: <SettingsApi>{},
        itemApi: <ItemApi>{},
        shareApi: <ShareApi>{},
        banners: <Banner[]>[],
        items: <Item[]>[],
        shares: <Share[]>[],
        profile: <User>{}
    },
    onLoad() {
        GetProfile(app, (profile) => {
            this.setData({
                settingsApi: new SettingsApi(),
                itemApi: new ItemApi(),
                shareApi: new ShareApi(),
                profile: profile
            });
            this.dataInit();
        });
    },
    async dataInit() {
        let banners = await this.data.settingsApi.getBanners();
        let itemList = await this.data.itemApi.query(1, 3);
        let shareList = await this.data.shareApi.query(0, 0, 1, 5);
        let shares = shareList.list;
        Utils.shareListSerialize(1, this.data.profile, ...shares);
        this.setData({
            banners: banners,
            items: itemList.list,
            shares: shares
        });
    }
});
