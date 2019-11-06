import {User} from './user';
import {ApiResponse} from './api-response';

export interface AuthResponse extends ApiResponse {
    data: {
        accessToken: string;
        profile: User;
    }
}