import {Class} from './class';

export interface Grade {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    classes: Class[]
}
