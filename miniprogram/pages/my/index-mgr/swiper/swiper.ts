import {WxBindEvent} from '../../../../utils/types/wx-bind-event';
import {ItemApi} from '../../../../apis/item-api';
import {UploadImageItem, UploadImageItemObj} from '../../../../utils/types/upload-image-item';
import {SettingsApi} from '../../../../apis/settings-api';
import {Banner} from '../../../../utils/types/banner';

Page({
    data: {
        swiperImages: <UploadImageItem[]>[],
        uploadImages: <string[]>[],
        itemApi: <ItemApi>{},
        settingsApi: <SettingsApi>{},
        banners: <Banner[]>[],
        upToken: '',

    },
    onLoad() {
        this.setData({
            itemApi: new ItemApi(),
            settingsApi: new SettingsApi()
        });
        this.data.settingsApi.uploadToken().then(result => {
            this.setData({
                upToken: result,
                swiperImages: []
            });
        });
        this.getSwiper();
    },
    getSwiper() {
        this.data.settingsApi.getBanners().then(result => {
            this.setData({
                banners: result,
                swiperImages: result.map(i => {
                    return <UploadImageItem>{
                        fileName: i.imageUrl.split('/')[i.imageUrl.split('/').length - 1],
                        tempPath: i.imageUrl,
                        completed: true,
                        success: true
                    };
                })
            });
        });
    },
    imageAction(e: WxBindEvent) {
        wx.showActionSheet({
            itemList: ['删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        console.log(e.currentTarget.dataset);
                        const swiperImages = this.data.swiperImages;
                        swiperImages.splice(e.currentTarget.dataset.imageIndex, 1);
                        this.setData({
                            swiperImages: swiperImages
                        });
                }
            }
        });
    },
    chooseImage() {
        wx.chooseImage({
            success: (res) => {
                const uploadImageItemObj = new UploadImageItemObj(this.data.upToken, res.tempFilePaths[0], 'index_swiper', (d) => {
                    if (d) {
                        let swiperImages = this.data.swiperImages;
                        swiperImages.forEach(i => {
                            if (i.fileName === d.fileName) {
                                i.progress = d.progress;
                                i.completed = d.completed;
                                i.success = d.success;
                            }
                        });
                        this.setData({
                            swiperImages: swiperImages
                        });
                    }

                });
                let swiperImages = this.data.swiperImages;
                swiperImages.push(uploadImageItemObj);
                this.setData({
                    swiperImages: swiperImages
                });
                uploadImageItemObj.upload();
            }
        });
    },
    submit() {
        const images = this.data.swiperImages.map(i => i.fileName);
        this.data.settingsApi.updateBanners(images).then(() => {
            wx.showToast({
                title: '保存成功',
            });
        });
    }
});
