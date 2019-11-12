import {ShareMedia} from './share-media';
import {Student} from './student';
import {User} from './user';
import {Item} from './item';
import {ShareComment} from '../share-comment';
import {ShareLike} from '../share-like';

export interface Share {
    id: number;
    userId: number;
    itemId: number;
    mediaId: number;
    studentId: number;
    title: string;
    desc: string;
    createdAt: Date;
    updatedAt: Date;

    media: ShareMedia;
    student: Student;
    user: User;
    item: Item;
    liked: boolean;
    timeDiff: string;

    comments: ShareComment[];
    likes: ShareLike[];
    likeUsersView: string;
}
