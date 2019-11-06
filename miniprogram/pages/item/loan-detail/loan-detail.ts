import {ItemApi} from '../../../apis/item-api';
import {ItemLendOrder} from '../../../utils/types/item-lend-order';

Page({
    data: {
        itemApi: <ItemApi>{},
        recordId: '',
        itemLoanedRecord: <ItemLendOrder>{}
    },
    onLoad(query: any) {
        this.setData({
            itemApi: new ItemApi(),
            recordId: query.id || ''
        });
    },
    onShow() {
        if (this.data.recordId) {
            this.data.itemApi.getLoanedRecord(this.data.recordId).then(result => {
                this.setData({
                    itemLoanedRecord: result
                });
            });
        }
    },
    agree() {
        wx.showModal({
            title: '同意此次借阅申请?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: () => {
                this.data.itemApi.loanedRecordStatus(this.data.recordId, 2).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        });
    },
    reject() {
        wx.showModal({
            title: '驳回此次借阅申请?',
            content: '',
            confirmText: '确定',
            cancelText: '取消',
            success: () => {
                this.data.itemApi.loanedRecordStatus(this.data.recordId, 3).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        });
    },
    agreeReturn() {
        wx.showModal({
            title: '确认归还?',
            content: '请确保图书已经归还！',
            confirmText: '确定',
            cancelText: '取消',
            success: () => {
                this.data.itemApi.loanReturn(this.data.recordId).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        });
    }
});
