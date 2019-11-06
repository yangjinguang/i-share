import {User} from './user';
import {Class} from './class';

export interface IdAuthOrder {
    id: number;
    userId: number;
    role: number;
    classId: number;
    studentName: string;
    relation: string;
    status: number;
    createdAt: Date;

    user: User;
    iClass: Class;
}
