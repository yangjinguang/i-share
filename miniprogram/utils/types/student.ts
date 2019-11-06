import {Class} from './class';
import {Grade} from './grade';

export interface Student {
    id: number;
    name: string;
    classId: number;
    gradeId: number;
    createdAt: Date;
    updatedAt: Date;

    class: Class;
    grade: Grade;
    classView: string;
}
