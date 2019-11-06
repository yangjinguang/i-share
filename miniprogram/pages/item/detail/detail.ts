import {ItemApi} from '../../../apis/item-api';
import {Item} from '../../../utils/types/item';
import {Utils} from '../../../utils/utils';

Page({
    data: {
        from: 1,
        itemApi: <ItemApi>{},
        itemId: 0,
        item: <Item>{}
    },
    onLoad(query: any) {
        this.setData({
            itemApi: new ItemApi(),
            itemId: Number(query.id),
            from: parseInt(query.from) || 1
        });
    },
    onShow() {
        if (this.data.itemId) {
            this.itemDetail(this.data.itemId);
        }
    },
    itemDetail(id: number) {
        this.data.itemApi.getOne(id).then(result => {
            result.tagsView = result.tags ? result.tags.map(i => i.name).join(',') : '';
            result.createdAtView = result.createdAt ? Utils.dateFormat(new Date(result.createdAt), 'yyyy-MM-dd hh:mm:ss') : '';
            this.setData({
                item: result
            });
        });
    },
    itemLoan() {
        const item = this.data.item;
        wx.navigateTo({
            url: `/pages/item/loan/loan?id=${item.id}`
        });
        // this.data.itemApi.loan(this.data.item.id)
    },
    itemEdit() {
        const item = this.data.item;
        wx.navigateTo({
            url: `/pages/item/upload/upload?id=${item.id}`
        });
    },
    itemDelete() {
        wx.showModal({
            title: '是否要删除此图书?',
            content: '删除后不可恢复',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                console.log(res);
                if (res.confirm) {
                    if (this.data.item.id) {
                        this.data.itemApi.delete(this.data.item.id).then(() => {
                            wx.navigateBack({
                                delta: 1
                            });
                        });
                    }
                } else {
                }
            }
        });
    },
    itemLoanCancel() {
        wx.showModal({
            title: '是否要强制取消借出状态?',
            content: '取消后不可恢复',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    if (!this.data.item.id) {
                        return;
                    }
                    this.data.itemApi.cancelItemLoan(this.data.item.id).then(() => {
                        if (this.data.item.id) {
                            this.itemDetail(this.data.item.id);
                        }
                    });
                } else {
                }
            }
        });
    }
});
