import {Pagination} from './pagination';
import {Share} from './share';

export interface ShareListResponse {
    list: Share[],
    pagination: Pagination
}