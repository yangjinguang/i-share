import {ShareMedia} from './share-media';
import {Student} from './student';
import {User} from './user';
import {Item} from './item';
import {Comment} from './comment';

export interface Share {
    id: number;
    userId: number;
    itemId: number;
    mediaId: number;
    studentId: number;
    title: string;
    desc: string;
    likeUserIds: number[];
    createdAt: Date;
    updatedAt: Date;

    media: ShareMedia;
    student: Student;
    user: User;
    item: Item;
    likeUsers: User[];
    likeUsersView: string;
    liked: boolean;
    timeDiff: string;
    comments: Comment[];
}
