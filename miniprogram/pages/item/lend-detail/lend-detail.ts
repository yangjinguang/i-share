import {ItemApi} from '../../../apis/item-api';
import {ItemLendOrder, ItemLoanedRecordArr} from '../../../utils/types/item-lend-order';
import {LendOrderHandleBody} from '../../../utils/types/lend-order-handle-body';
import {Utils} from '../../../utils/utils';

Page({
    data: {
        itemApi: <ItemApi>{},
        orderId: 0,
        itemLendOrder: <ItemLendOrder>{},
        isAgree: true,
        from: 1,
    },
    onLoad(query: any) {
        this.setData({
            itemApi: new ItemApi(),
            orderId: query.id ? Number(query.id) : 0,
            from: query.from ? Number(query.from) : 1,
        });
    },
    onShow() {
        this.getDetail();
    },
    getDetail() {
        if (this.data.orderId) {
            this.data.itemApi.getLendDetail(this.data.orderId).then(result => {
                result.createdAtView = result.createdAt ? Utils.dateFormat(new Date(result.createdAt), 'yyyy-MM-dd hh:mm:ss') : '';
                result.statusView = result.status ? ItemLoanedRecordArr[result.status] : '';
                this.setData({
                    itemLendOrder: result
                });
            });
        }
    },
    agreeChange(e: any) {
        this.setData!({
            isAgree: e.detail.value == 'true'
        });
        console.log(this.data);
    },
    formSubmit() {
        let body = <LendOrderHandleBody>{
            orderId: this.data.orderId,
            agree: this.data.isAgree,
        };
        this.data.itemApi.lendOrderHandle(body).then(() => {
            wx.navigateBack({
                delta: 1
            });
        });
    },
    lendReturn() {
        wx.showModal({
            title: '确定要归还此图书?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    this.data.itemApi.lendReturn(this.data.itemLendOrder.id).then(() => {
                        this.getDetail();
                    });
                } else {
                }
            }
        });

    },
    lendCancel() {
        wx.showModal({
            title: '确定撤回此次借阅?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    this.data.itemApi.lendCancel(this.data.itemLendOrder.id).then(() => {
                        this.getDetail();
                    });
                } else {
                }
            }
        });
    },
    lendDelete() {
        wx.showModal({
            title: '确定要删除此申请?',
            content: '删除后不可恢复',
            confirmText: '确定',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    this.data.itemApi.lendDelete(this.data.itemLendOrder.id).then(() => {
                        wx.navigateBack({
                            delta: 1
                        });
                    });
                } else {
                }
            }
        });
    }
});
