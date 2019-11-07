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

    item: Item;
    user: User;
    student: Student;
    iClass: Class;
    studentClass: Class;
    beginEndStr: string;
    statusView: string
}

export const ItemLoanedRecordArr = [
    'self',
    '待确认',
    '已同意',
    '已拒绝',
    '已逾期',
    '归还中',
    '已归还'
];
