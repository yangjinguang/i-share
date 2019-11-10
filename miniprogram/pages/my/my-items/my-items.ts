import {ItemApi} from '../../../apis/item-api';
import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {Pagination} from '../../../utils/types/pagination';
import {Utils} from '../../../utils/utils';

Page({
    data: {
        curTab: 2,
        itemApi: <ItemApi>{},
        lendOrders: <ItemLendOrder[]>[],
        tabStatusList: [
            [1,3,4],
            [2,5,7],
            [6]
        ],
        pagination: <Pagination>{
            page: 1,
            size: 20
        }

    },
    onLoad() {
        this.setData!({
            itemApi: new ItemApi()
        });
    },
    onShow() {
        this.getRecords();
    },
    getRecords(page?: number) {
        page = page || this.data.pagination.page;
        let size = this.data.pagination.size;
        this.data.itemApi.getMyLendOrders(this.data.tabStatusList[this.data.curTab - 1], page, size).then(result => {
            result = result || [];
            console.log(result.list);
            result.list.forEach(l => {
                l.createdAtView = l.createdAt ? Utils.dateFormat(new Date(l.createdAt), 'yyyy-MM-dd hh:mm:ss') : '';
            });
            this.setData({
                lendOrders: result.list
            });
        });
    },
    tagSwitch(e: any) {
        const index = parseInt(e.currentTarget.dataset.tabIndex);
        if (index && index !== this.data.curTab) {
            this.setData({
                curTab: index
            });
            this.getRecords();
        }
    },
    itemDetail(e: any) {
        const itemId = e.currentTarget.dataset.itemId;
        console.log(itemId);
        if (itemId) {
            wx.navigateTo({
                url: `/pages/item/detail/detail?id=${itemId}`
            });
        }
    },
    recordAction(e: any) {
        console.log(e);
        const orderId = e.currentTarget.dataset.orderId;
        switch (this.data.curTab) {
            case 1:
                wx.showActionSheet({
                    itemList: ['撤回'],
                    success: () => {
                        if (orderId) {
                            this.data.itemApi.lendCancel(orderId).then(() => {
                                this.getRecords();
                            });
                        }
                    }
                });
                break;
            case 2:
                wx.showActionSheet({
                    itemList: ['退还'],
                    success: () => {
                        if (orderId) {
                            this.data.itemApi.lendReturn(orderId).then(() => {
                                this.getRecords();
                            });
                        }
                    }
                });
                break;
            case 3:
                wx.showActionSheet({
                    itemList: ['删除'],
                    success: () => {
                        if (orderId) {
                            this.data.itemApi.lendDelete(orderId).then(() => {
                                this.getRecords();
                            });
                        }
                    }
                });
                break;
        }

    }
});
