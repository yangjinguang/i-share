import {ApiResponse} from './api-response';
import {User} from './user';

export interface UserResponse extends ApiResponse {
    data: User;
}