import {ItemApi} from '../../../apis/item-api';
import {Item} from '../../../utils/types/item';
import {ItemTag} from '../../../utils/types/item-tag';
import {UploadImageItem, UploadImageItemObj} from '../../../utils/types/upload-image-item';
import {SettingsApi} from '../../../apis/settings-api';
import {Grade} from '../../../utils/types/grade';
import {ClassApi} from '../../../apis/class-api';
import {Class} from '../../../utils/types/class';

Page({
    data: {
        itemApi: <ItemApi>{},
        settingsApi: <SettingsApi>{},
        classApi: <ClassApi>{},
        item: <Item>{},
        upToken: '',
        types: <string[]>['图书', '玩具'],
        typeIndex: 0,
        tags: <ItemTag[]>[],
        tagArr: <string[]>[],
        tagIndex: 0,
        title: '',
        describe: '',
        selectedTags: <ItemTag[]>[],
        selectedCover: <UploadImageItem>{},
        isNew: true,
        classTree: <Grade[]>[],
        classArr: <any[]>[],
        classIndex: <number[]>[],
    },
    onLoad(query: any) {
        const id = query['id'];
        this.setData({
            itemApi: new ItemApi(),
            settingsApi: new SettingsApi(),
            classApi: new ClassApi()
        });
        this.getBaseData().then(() => {
            if (id) {
                this.getItem(id);
            }
        });
    },
    getItem(id: number) {
        this.data.itemApi.getOne(id).then(result => {
            let selectedTags = <ItemTag[]>[];
            if (result.tags) {
                selectedTags = result.tags;
            }
            let selectedCover = <UploadImageItem>{};
            if (result.coverUrl) {
                let arr = result.coverUrl.split('/');
                selectedCover = <UploadImageItem>{
                    tempPath: result.coverUrl,
                    completed: true,
                    success: true,
                    fileName: arr[arr.length - 1]
                };
            }
            const classTree = this.data.classTree;
            const iClass = result.iClass || <Class>{};
            let gradeI = classTree.findIndex(i => i.id === iClass.gradeId);
            let classI = classTree[gradeI].classes.findIndex(i => i.id == iClass.id);
            let classIndex = <number[]>[gradeI, classI];
            this.setData({
                item: result,
                typeIndex: result.type,
                title: result.title,
                desc: result.desc,
                selectedTags: selectedTags,
                selectedCover: selectedCover,
                isNew: false,
                classIndex: classIndex
            });
        });
    },
    async getBaseData() {
        let tags = await this.data.itemApi.getTags();
        let classTree = await this.data.classApi.classTree();
        let uploadToke = await this.data.settingsApi.uploadToken();
        const arr = [];
        arr[0] = classTree.map(i => i.name);
        arr[1] = classTree[0].classes ? classTree[0].classes.map(i => i.name) : [];
        this.setData({
            classTree: classTree,
            classArr: arr,
            tags: tags,
            tagArr: tags.map(i => i.name),
            upToken: uploadToke
        });
    },
    bindTypeChange(e: any) {
        this.setData({
            typeIndex: e.detail.value
        });
    },
    bindTagsChange(e: any) {
        const selectedTags = this.data.selectedTags;
        const curIndex = parseInt(e.detail.value);
        const tag = this.data.tags[curIndex];
        if (!selectedTags.find(i => i.id === tag.id)) {
            selectedTags.push(tag);
        }
        this.setData({
            selectedTags: selectedTags
        });
        console.log(this.data.selectedTags);
    },
    deleteTag(e: any) {
        let tagIndex = e.currentTarget.dataset.tagIndex;
        console.log(tagIndex);
        let selectedTags = this.data.selectedTags;
        selectedTags.splice(tagIndex, 1);
        this.setData({
            selectedTags: selectedTags
        });
    },
    chooseImage() {
        wx.chooseImage({
            success: (res) => {
                const fileItem = new UploadImageItemObj(this.data.upToken, res.tempFilePaths[0], 'item_cover', (item) => {
                    this.setData({
                        selectedCover: item
                    });
                });
                fileItem.upload();
                this.setData({
                    selectedCover: fileItem
                });
            }
        });
    },
    clearForm() {
        this.setData({});
    },
    bindClassColumnChange(e: any) {
        if (e.detail['column'] === 0) {
            const gradeIndex = parseInt(e.detail.value);
            let classTree = this.data.classTree as Array<Grade>;
            this.setData({
                classArr: [
                    this.data.classArr[0],
                    classTree[gradeIndex].classes.map(i => i.name)
                ]
            });
        }

    },
    bindClassChange(e: any) {
        const classIndex = e.detail.value;
        this.setData({
            classIndex: classIndex
        });
    },
    formSubmit(e: any) {
        let classTree = this.data.classTree as Array<Grade>;
        const formValue = e.detail.value;
        const tags: number[] = [];
        this.data.selectedTags.forEach(i => {
            tags.push(i.id);
        });
        const newItem = <Item>{
            title: formValue['title'],
            type: formValue['type'],
            tagIds: tags,
            coverUrl: this.data.selectedCover.fileName,
            desc: formValue['desc']
        };
        if (formValue['class'] && formValue['class'].length > 0) {
            newItem.classId = classTree[formValue['class'][0]].classes[formValue['class'][1]].id;
        } else {
            return;
        }
        console.log(newItem);
        if (this.data.isNew) {
            this.data.itemApi.create(newItem).then(() => {
                wx.showModal({
                    title: '上传成功',
                    content: '是否继续上传?',
                    confirmText: '确定',
                    cancelText: '返回',
                    success: (res) => {
                        if (res.confirm) {
                            this.setData({
                                title: '',
                                describe: '',
                                typeIndex: 0,
                                selectedCover: <UploadImageItem>{},
                                selectedTags: [],
                            });
                        } else {
                            wx.navigateBack({
                                delta: 1
                            });
                        }
                    }
                });
            });
        } else {
            if (this.data.item.id) {
                this.data.itemApi.update(this.data.item.id, newItem).then(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                });
            }
        }
    }
});
