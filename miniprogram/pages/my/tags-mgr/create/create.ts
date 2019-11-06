import {ItemApi} from '../../../../apis/item-api';
import {ItemTag} from '../../../../utils/types/item-tag';

Page({
    data: {
        itemApi: <ItemApi>{},
        tag: <ItemTag>{},
        isNew: true
    },
    onLoad(query: any) {
        console.log(query['id']);
        const tagId = query['id'];
        this.setData({
            itemApi: new ItemApi()
        });
        if (tagId) {
            this.data.itemApi.getTag(tagId).then(result => {
                this.setData({
                    tag: result,
                    isNew: false
                });
            });
        }

    },
    formSubmit(e: any) {
        console.log(e.detail.value);
        const tag = <ItemTag>{
            name: e.detail.value['name']
        };
        if (this.data.isNew) {
            this.data.itemApi.createTag(tag).then(() => {
                wx.navigateBack({
                    delta: 1
                });
            });
        } else {
            const id = this.data.tag.id;
            if (id) {
                this.data.itemApi.updateTag(id, tag).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
    }
});
