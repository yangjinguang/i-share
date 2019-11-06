import {ItemApi} from '../../../apis/item-api';
import {Item} from '../../../utils/types/item';
import {SettingsApi} from '../../../apis/settings-api';

Page({
    data: {
        itemApi: <ItemApi>{},
        settingsApi: <SettingsApi>{},
        items: <Item[]>{},
        page: 1,
    },
    onLoad() {
        this.setData({
            itemApi: new ItemApi(),
            settingsApi: new SettingsApi()
        });
    },
    onShow() {
        this.query(1);
    },
    itemUpload() {
        this._itemUpload();
    },
    _itemUpload(id?: string) {
        let url = '/pages/item/upload/upload';
        if (id) {
            url = url + '?id=' + id;
        }
        wx.navigateTo({
            url: url
        });
    },
    query(page?: number) {
        page = page || this.data.page;
        this.data.itemApi.queryMgr(page, 20).then(result => {
            this.setData({
                items: result.list,
                page: result.pagination.page
            });
        });
    },
    itemDetail(e: any) {
        const id = e.currentTarget.dataset.itemId;
        if (id) {
            wx.navigateTo({
                url: '/pages/item/detail/detail?from=2&id=' + id
            });
        }
    },
    itemAction(e: any) {
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        if (e.currentTarget.dataset.itemId) {
                            this._itemUpload(e.currentTarget.dataset.itemId);
                        }
                        break;
                    case 1:
                        if (e.currentTarget.dataset.itemId) {
                            this.itemDelete(e.currentTarget.dataset.itemId);
                        }
                        break;
                }
            }
        });
    },
    itemDelete(id: number) {
        this.data.itemApi.delete(id).then(() => {
            this.query();
        });
    }
});
