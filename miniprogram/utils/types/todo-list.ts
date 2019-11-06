import {ItemLendOrder} from './item-lend-order';
import {IdAuthOrder} from './id-auth-order';

export interface TodoList {
    itemLendOrders: ItemLendOrder[];
    idAuthOrders: IdAuthOrder[];
}
