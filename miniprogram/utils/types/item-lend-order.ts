import {Item} from './item';
import {User} from './user';
import {Student} from './student';

export interface ItemLendOrder {
    id: number;
    itemId: number;
    userId: number;
    studentId: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;

    item: Item;
    user: User;
    student: Student;
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
