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
        tagId: 0,
        page: 1
    },
    onLoad() {
        this.setData({
            itemApi: new ItemApi(),
            classApi: new ClassApi()
        });
    },
    onShow() {
        this.setData({
            tagsArr: <string[]>[],
            items: <Item[]>[],
            classes: <Class[]>[],
            classTree: <Grade[]>[],
            classesArr: <string[]>[],
            classIndex: 0,
            tagIndex: 0,
            tagId: 0,
            page: 1
        });
        this.data.classApi.classTree().then(result => {
            let classes = <Class[]>[];
            let classesArr = ['全部'];
            result.forEach(g => {
                const _classes = g.classes || [];
                _classes.forEach(c => {
                    classesArr.push(g.name + ' ' + c.name);
                    classes.push(c);
                });
            });
            this.setData({
                classes: classes,
                classTree: result,
                classesArr: classesArr
            });
        });
        this.data.itemApi.getTags().then(result => {
            this.setData({
                tags: result,
                tagsArr: ['全部'].concat(result.map(i => i.name))
            });
        });
        this.itemsQuery();
    },
    tagSwitch(e: any) {
        const index = e.currentTarget.dataset.tagIndex;
        if (index !== this.data.tagIndex) {
            this.setData({
                tagIndex: index
            });
        }
        let tagId = 0;
        if (index >= 0) {
            tagId = this.data.tags[index].id;
        }
        this.setData({
            items: <Item[]>[],
            page: 1
        });
        this.itemsQuery(this.data.page, tagId);
    },
    itemsQuery(page?: number, tagId?: number) {
        page = page || this.data.page;
        tagId = tagId || this.data.tagId;
        this.data.itemApi.query(page, 20, tagId).then(result => {
            let items = this.data.items || [];
            if (result.list && result.list.length > 0) {
                items = items.concat(result.list);
            }
            this.setData({
                items: items,
                page: result.pagination.page
            });
        });
    },
    toDetail(e: any) {
        const id = e.currentTarget.dataset.itemId;
        if (id) {
            wx.navigateTo({
                url: '/pages/item/detail/detail?id=' + id
            });
        }
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
                tagId: tagId
            });
        }
        this.setData({
            items: <Item[]>[],
            page: 1
        });
        this.itemsQuery(this.data.page, tagId);
    },
    bindClassFilterChange(e: WxBindEvent) {
        console.log(e);
        this.setData({
            classIndex: e.detail.value
        });
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
            inputVal: e.detail.value
        });
    }
});