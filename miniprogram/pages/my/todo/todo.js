"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_api_1 = require("../../../apis/todo-api");
Page({
    data: {
        todoApi: {},
        todoList: {},
        idAuthOrders: [],
        itemLendOrders: []
    },
    onLoad: function () {
        this.setData({
            todoApi: new todo_api_1.TodoApi()
        });
    },
    onShow: function () {
        var _this = this;
        this.data.todoApi.getList().then(function (result) {
            _this.setData({
                todoList: result,
                idAuthOrders: result.idAuthOrders || [],
                itemLendOrders: result.itemLendOrders || [],
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvZG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0M7QUFLL0MsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFXLEVBQUU7UUFDcEIsUUFBUSxFQUFZLEVBQUU7UUFDdEIsWUFBWSxFQUFpQixFQUFFO1FBQy9CLGNBQWMsRUFBbUIsRUFBRTtLQUN0QztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUksa0JBQU8sRUFBRTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUFOLGlCQVFDO1FBUEcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNuQyxLQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFFBQVEsRUFBRSxNQUFNO2dCQUNoQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFO2dCQUN2QyxjQUFjLEVBQUUsTUFBTSxDQUFDLGNBQWMsSUFBSSxFQUFFO2FBQzlDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VG9kb0FwaX0gZnJvbSAnLi4vLi4vLi4vYXBpcy90b2RvLWFwaSc7XG5pbXBvcnQge1RvZG9MaXN0fSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy90b2RvLWxpc3QnO1xuaW1wb3J0IHtJdGVtTGVuZE9yZGVyfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcy9pdGVtLWxlbmQtb3JkZXInO1xuaW1wb3J0IHtJZEF1dGhPcmRlcn0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdHlwZXMvaWQtYXV0aC1vcmRlcic7XG5cblBhZ2Uoe1xuICAgIGRhdGE6IHtcbiAgICAgICAgdG9kb0FwaTogPFRvZG9BcGk+e30sXG4gICAgICAgIHRvZG9MaXN0OiA8VG9kb0xpc3Q+e30sXG4gICAgICAgIGlkQXV0aE9yZGVyczogPElkQXV0aE9yZGVyW10+W10sXG4gICAgICAgIGl0ZW1MZW5kT3JkZXJzOiA8SXRlbUxlbmRPcmRlcltdPltdXG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB0b2RvQXBpOiBuZXcgVG9kb0FwaSgpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmRhdGEudG9kb0FwaS5nZXRMaXN0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB0b2RvTGlzdDogcmVzdWx0LFxuICAgICAgICAgICAgICAgIGlkQXV0aE9yZGVyczogcmVzdWx0LmlkQXV0aE9yZGVycyB8fCBbXSxcbiAgICAgICAgICAgICAgICBpdGVtTGVuZE9yZGVyczogcmVzdWx0Lml0ZW1MZW5kT3JkZXJzIHx8IFtdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIl19