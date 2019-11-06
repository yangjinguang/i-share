import {ItemApi} from '../../../apis/item-api';
import {ItemTag} from '../../../utils/types/item-tag';

Page({
    data: {
        itemApi: <ItemApi>{},
        tags: <ItemTag[]>[],
    },
    onLoad() {
        this.setData({
            itemApi: new ItemApi(),
        });
    },
    onShow() {
        this.getTags();
    },
    getTags() {
        this.data.itemApi.getTags().then(result => {
            this.setData({
                tags: result
            });
        });
    },
    _tagCreate(id?: number) {
        let url = '/pages/my/tags-mgr/create/create';
        if (id) {
            url = url + '?id=' + id;
        }
        wx.navigateTo({
            url: url
        });
    },
    tagCreate() {
        this._tagCreate();
    },
    tagAction(e: any) {
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                            if (e.currentTarget.dataset.tagId) {
                            this._tagCreate(e.currentTarget.dataset.tagId);
                        }
                        break;
                    case 1:
                        if (e.currentTarget.dataset.tagId) {
                            this.tagDelete(e.currentTarget.dataset.tagId);
                        }
                        break;
                }
            }
        });
    },
    tagDelete(id: number) {
        this.data.itemApi.deleteTag(id).then(() => {
            this.getTags();
        });
    }
});
