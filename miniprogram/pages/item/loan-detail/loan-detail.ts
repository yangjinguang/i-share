import {ItemApi} from '../../../apis/item-api';
import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {LendOrderHandleBody} from '../../../utils/types/lend-order-handle-body';

Page({
    data: {
        itemApi: <ItemApi>{},
        orderId: 0,
        itemLendOrder: <ItemLendOrder>{},
        isAgree: true
    },
    onLoad(query: any) {
        this.setData({
            itemApi: new ItemApi(),
            orderId: query.id ? Number(query.id) : 0
        });
    },
    onShow() {
        if (this.data.orderId) {
            this.data.itemApi.getLendDetail(this.data.orderId).then(result => {
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
    }
    // agree() {
    //     wx.showModal({
    //         title: '同意此次借阅申请?',
    //         content: '',
    //         confirmText: '确定',
    //         cancelText: '取消',
    //         success: () => {
    //             // this.data.itemApi.loanedRecordStatus(this.data.orderId, 2).then(() => {
    //             //     wx.navigateBack({
    //             //         delta: 1
    //             //     });
    //             // });
    //         }
    //     });
    // },
    // reject() {
    //     wx.showModal({
    //         title: '驳回此次借阅申请?',
    //         content: '',
    //         confirmText: '确定',
    //         cancelText: '取消',
    //         success: () => {
    //             this.data.itemApi.loanedRecordStatus(this.data.recordId, 3).then(() => {
    //                 wx.navigateBack({
    //                     delta: 1
    //                 });
    //             });
    //         }
    //     });
    // },
    // agreeReturn() {
    //     wx.showModal({
    //         title: '确认归还?',
    //         content: '请确保图书已经归还！',
    //         confirmText: '确定',
    //         cancelText: '取消',
    //         success: () => {
    //             this.data.itemApi.loanReturn(this.data.recordId).then(() => {
    //                 wx.navigateBack({
    //                     delta: 1
    //                 });
    //             });
    //         }
    //     });
    // }
});
