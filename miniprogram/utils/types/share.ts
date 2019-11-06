import {VideoOb} from './video-ob';
import {Student} from './student';
import {User} from './user';
import {Item} from './item';
import {Comment} from './comment';

export interface Share {
    id: number;
    userId: number;
    itemId: number;
    classId: number;
    childId: number;
    title: string;
    video: VideoOb;
    describe: string;
    likeUserIds: number[];
    createdAt: Date;
    updatedAt: Date;

    child: Student;
    user: User;
    item: Item;
    likeUsers: User[];
    likeUsersView: string;
    liked: boolean;
    timeDiff: string;
    comments: Comment[];
}
