import {Student} from './student';

export interface ChildrenRelation {
    childId: string;
    relation: string;
    child: Student;
}
