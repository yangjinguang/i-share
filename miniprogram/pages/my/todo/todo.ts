import {TodoApi} from '../../../apis/todo-api';
import {TodoList} from '../../../utils/types/todo-list';
import {ItemLendOrder} from '../../../utils/types/item-lend-order';
import {IdAuthOrder} from '../../../utils/types/id-auth-order';

Page({
    data: {
        todoApi: <TodoApi>{},
        todoList: <TodoList>{},
        idAuthOrders: <IdAuthOrder[]>[],
        itemLendOrders: <ItemLendOrder[]>[]
    },
    onLoad() {
        this.setData({
            todoApi: new TodoApi()
        });
    },
    onShow() {
        this.data.todoApi.getList().then(result => {
            this.setData({
                todoList: result,
                idAuthOrders: result.idAuthOrders || [],
                itemLendOrders: result.itemLendOrders || [],
            });
        });
    }
});
