import {Grade} from './grade';

export interface Class {
    id: number;
    gradeId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    grade: Grade;
    gradeName:string;
}
