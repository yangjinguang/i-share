// pages/catalog/catalog.js
import {ItemApi} from '../../apis/item-api';
import {ItemTag} from '../../utils/types/item-tag';
import {Item} from '../../utils/types/item';
import {ClassApi} from '../../apis/class-api';
import {Grade} from '../../utils/types/grade';
import {Class} from '../../utils/types/class';
import {WxBindEvent} from '../../utils/types/wx-bind-event';

Page({
    data: {
        itemApi: <ItemApi>{},
        classApi: <ClassApi>{},
        tags: <ItemTag[]>[],
        tagsArr: <string[]>[],
        items: <Item[]>[],
        classes: <Class[]>[],
        classTree: <Grade[]>[],
        classesArr: <string[]>[],
        classIndex: 0,
        tagIndex: 0,
        filterTagId: 0,
        filterClassId: 0,
        page: 1,
        searchTimer: 0,
        searchResult: <Item[]>[]
    },
    onLoad() {
        this.setData({
            itemApi: new ItemApi(),
            classApi: new ClassApi()
        });
    },
    onShow() {
        this.getBaseData().then(() => {
        });
        this.itemsQuery(1);
    },
    async getBaseData() {
        let classes = await this.data.classApi.classList();
        let classesArr = ['全部'];
        classes.forEach(c => {
            classesArr.push(c.gradeName + ' ' + c.name);
        });
        let tags = await this.data.itemApi.getTags();
        this.setData({
            classes: classes,
            classesArr: classesArr,
            tags: tags,
            tagsArr: ['全部'].concat(tags.map(i => i.name))
        });
    },
    itemsQuery(page?: number) {
        page = page || this.data.page;
        let tagId = this.data.filterTagId;
        let classId = this.data.filterClassId;
        this.data.itemApi.query(page, 20, tagId, classId).then(result => {
            let items = <Item[]>[];
            if (page && page > 1) {
                items = this.data.items;
            }
            if (result.list && result.list.length > 0) {
                items = items.concat(result.list);
            }
            this.setData({
                items: items,
                page: result.pagination.page
            });
        });
    },
    bindTagFilterChange(e: WxBindEvent) {
        const index = e.detail.value;

        let tagId = 0;
        if (index > 0) {
            tagId = this.data.tags[index - 1].id;
        }
        if (index !== this.data.tagIndex) {
            this.setData({
                tagIndex: index,
                filterTagId: tagId,
                items: <Item[]>[],
                page: 1
            });
            this.itemsQuery(this.data.page);
        }
    },
    bindClassFilterChange(e: WxBindEvent) {
        const index = e.detail.value;
        let classId = 0;
        if (index > 0) {
            classId = this.data.classes[index - 1].id;
        }
        if (index !== this.data.classIndex) {
            this.setData({
                classIndex: e.detail.value,
                filterClassId: classId,
                items: <Item[]>[],
                page: 1
            });
            this.itemsQuery(this.data.page);
        }
    },
    toLoan(e: WxBindEvent) {
        wx.navigateTo({
            url: `/pages/item/loan/loan?id=${e.currentTarget.dataset.itemId}`
        });
    },
    getMore(e: WxBindEvent) {
        console.log(e);
        this.itemsQuery(this.data.page + 1);
    },
    showInput() {
        this.setData({
            inputShowed: true
        });
    },
    hideInput() {
        this.setData({
            inputVal: '',
            inputShowed: false
        });
    },
    clearInput() {
        this.setData({
            inputVal: ''
        });
    },
    inputTyping(e: any) {
        this.setData({
            searchTimer: new Date().getTime()
        });
        setTimeout(() => {
            if (new Date().getTime() - this.data.searchTimer >= 500) {
                this.data.itemApi.search(e.detail.value).then(result => {
                    this.setData({
                        searchResult: result,
                        inputVal: e.detail.value
                    });
                });
            }
        }, 500);
    },
});
