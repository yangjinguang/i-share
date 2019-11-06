import {Item} from './item';
import {Pagination} from './pagination';

export interface ItemQueryResponse {
    list: Item[],
    pagination: Pagination
}