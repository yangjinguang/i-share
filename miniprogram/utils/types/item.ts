import {Class} from './class';
import {ItemTag} from './item-tag';

export interface Item {
    id?: number;
    title: string;
    type: number;
    classId?: number;
    coverUrl: string;
    desc: string;
    status:number;
    uploadUserId?: number;
    createdAt?: string;
    createdAtView?: string;
    updatedAt?: Date;

    tagIds?: number[];
    tags?: ItemTag[];
    tagsView?: string;
    iClass?: Class;
    classView?: string;
    lend: boolean
}
