import {ChildrenRelation} from './children-relation';
import {Class} from './class';

export interface User {
    id: number;
    nickName: string;
    avatarUrl: string;
    roles: number[];
    status: number;
    gender: number;
    birthday: Date;
    openId: string;
    createdAt: Date;
    updatedAt: Date;

    childrenRelationsDetails: ChildrenRelation[];
    classes: Class[];
    isAdmin: boolean;
    isTeacher: boolean;
    isLogin: boolean;
}

