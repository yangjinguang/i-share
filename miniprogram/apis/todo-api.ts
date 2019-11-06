import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {TodoList} from '../utils/types/todo-list';

export class TodoApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public getList(): Promise<TodoList> {
        return this.http.get(`${config.apiBaseUrl}/todo`);
    }

    public getCount(): Promise<{ count: number }> {
        return this.http.get(`${config.apiBaseUrl}/todo/count`);
    }
}