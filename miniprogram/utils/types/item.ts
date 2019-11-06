import {Class} from './class';
import {ItemTag} from './item-tag';

export interface Item {
    id?: number;
    title: string;
    type: number;
    classId?: number;
    coverUrl: string;
    desc: string;
    uploadUserId?: number;
    createdAt?: string;
    createdAtView?: string;
    updatedAt?: Date;

    tagIds?: number[];
    tags?: ItemTag[];
    tagsView?: string;
    iClass?: Class;
    classView?: string;
}
