import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {ItemApi} from '../../../apis/item-api';
import {Student} from '../../../utils/types/student';
import {UserApi} from '../../../apis/user-api';

Page({
    data: {
        userApi: <UserApi>{},
        itemApi: <ItemApi>{},
        itemId: 0,
        children: <Student[]>[],
        childrenArr: <string[]>[],
        childIndex: 0,
    },
    onLoad(query: any) {
        this.setData({
            userApi: new UserApi(),
            itemApi: new ItemApi(),
            itemId: query.id
        });
    },
    onShow() {
        this.getChildren();
    },
    getChildren() {
        this.data.userApi.profile().then(result => {
            const children = result ? result.childrenRelationsDetails.map(i => i.child) : [];
            this.setData({
                children: children,
                childrenArr: children.map(i => i.name)
            });
        });
    },
    bindChildIndexChange(e: any) {
        this.setData({
            childIndex: e.detail.value
        });
    },
    formSubmit() {
        const newRecord = <ItemLendOrder>{
            itemId: this.data.itemId,
            childId: this.data.children[this.data.childIndex].id
        };
        this.data.itemApi.loan(this.data.itemId, newRecord).then((result) => {
            console.log(result);
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
