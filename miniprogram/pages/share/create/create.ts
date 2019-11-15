import {UploadVideoItem, UploadVideoItemObj} from '../../../utils/types/upload-video-item';
import {ItemApi} from '../../../apis/item-api';
import {Student} from '../../../utils/types/student';
import {UserApi} from '../../../apis/user-api';
import {Share} from '../../../utils/types/share';
import {User} from '../../../utils/types/user';
import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {ShareApi} from '../../../apis/share-api';
import {ShareMedia} from '../../../utils/types/share-media';
import {SettingsApi} from '../../../apis/settings-api';
import {StudentApi} from '../../../apis/student-api';

Page({
    data: {
        userApi: <UserApi>{},
        itemApi: <ItemApi>{},
        shareApi: <ShareApi>{},
        settingsApi: <SettingsApi>{},
        studentApi: <StudentApi>{},
        selectedVideo: <UploadVideoItem>{},
        upToken: '',
        itemLendOrders: <ItemLendOrder[]>{},
        itemLendOrdersArr: <string[]>[],
        itemLendOrdersIndex: 0,
        profile: <User>{},
        students: <Student[]>[],
        studentArr: <string[]>[],
        studentIndex: 0
    },
    onLoad() {
        this.setData({
            userApi: new UserApi(),
            itemApi: new ItemApi(),
            shareApi: new ShareApi(),
            settingsApi: new SettingsApi(),
            studentApi: new StudentApi()
        });
    },
    onShow() {
        this.getMyItems();
        this.getChildren();
        this.data.settingsApi.uploadToken().then(result => {
            this.setData({
                upToken: result
            });
        });
    },
    bindRecordChange(e: any) {
        this.setData({
            itemLendOrdersIndex: e.detail.value
        });
    },
    getChildren() {
        this.data.studentApi.getMy().then(result => {
            this.setData({
                students: result,
                studentArr: result.map(i => i.name)
            });
            console.log(this.data.studentArr);
        });

    },
    bindChildChange(e: any) {
        this.setData({
            childIndex: e.detail.value
        });
    },
    getMyItems() {
        this.data.itemApi.getMyLendOrders([2], 1, 9999).then(result => {
            this.setData({
                itemLendOrders: result.list,
                itemLendOrdersArr: result && result.list ? result.list.map(i => i.itemTitle) : []
            });
        });
    },
    chooseVideo() {
        wx.chooseVideo({
            sourceType: ['camera', 'album'],
            maxDuration: 60,
            success: (res) => {
                console.log(res);
                const fileItem = new UploadVideoItemObj(this.data.upToken, res, (result) => {
                    this.setData({
                        selectedVideo: result
                    });
                });
                fileItem.upload();
                this.setData({
                    selectedVideo: fileItem
                });
            }
        });
    },
    formSubmit(e: any) {
        const lendOrder = this.data.itemLendOrders[this.data.itemLendOrdersIndex];
        const student = this.data.students[this.data.studentIndex];
        const selectedVideo = this.data.selectedVideo;
        if (!selectedVideo.success) {
            wx.showToast({
                image: '/icons/exclamation-circle.png',
                title: '视频未成功上传'
            });
            return;
        }
        const newShare = <Share>{
            itemId: lendOrder.itemId,
            studentId: student.id,
            media: <ShareMedia>{
                path: selectedVideo.fileName,
                duration: selectedVideo.duration,
                size: selectedVideo.size,
                width: selectedVideo.width,
                height: selectedVideo.height
            },
            desc: e.detail.value['desc']
        };
        this.data.shareApi.create(newShare).then(result => {
            console.log(result);
            wx.navigateBack({
                delta: 1
            });
        });
    }
});
