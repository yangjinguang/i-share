import {Item} from './item';
import {User} from './user';
import {Student} from './student';
import {Class} from './class';

export interface ItemLendOrder {
    id: number;
    itemId: number;
    userId: number;
    studentId: number;
    classId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    userName: string;
    itemTitle: string;
    itemCoverUrl: string;
    item: Item;
    user: User;
    student: Student;
    iClass: Class;
    studentClass: Class;
    beginEndStr: string;
    statusView: string
    createdAtView: string;
}

export const ItemLoanedRecordArr = [
    'self',
    '待确认',
    '阅读中',
    '借阅被拒绝',
    '已撤回',
    '归还中',
    '已归还',
    '已逾期'
];
