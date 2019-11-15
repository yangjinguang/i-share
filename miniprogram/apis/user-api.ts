import {config} from '../utils/config';
import {HttpClient} from '../utils/http-client';
import {User} from '../utils/types/user';
import {IdAuthOrder} from '../utils/types/id-auth-order';
import {UserIdAuthHandleData} from '../utils/types/user-id-auth-handle-data';

export class UserApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public profileUpdate(postData: object): Promise<User> {
        return this.http.put(`${config.apiBaseUrl}/users/profile/update`, postData);
    }

    public profile(): Promise<User> {
        return this.http.get(`${config.apiBaseUrl}/users/profile`);
    }

    public idAuth(newOrder: IdAuthOrder): Promise<IdAuthOrder> {
        return this.http.post(`${config.apiBaseUrl}/users/id-auth`, newOrder);
    }

    public idAuthHandle(handleData: UserIdAuthHandleData): Promise<IdAuthOrder> {
        return this.http.put(`${config.apiBaseUrl}/users/id-auth/handle`, handleData);
    }

    public getIdAuthDetail(orderId: number): Promise<IdAuthOrder> {
        return this.http.get(`${config.apiBaseUrl}/users/id-auth/${orderId}`);
    }

    public unbindClass(userId: number, classId: number): Promise<string> {
        return this.http.put(`${config.apiBaseUrl}/users/unbind-class`, {userId: userId, classId: classId});
    }

    public unbindStudent(userId: number, studentId: number): Promise<string> {
        return this.http.put(`${config.apiBaseUrl}/users/unbind-student`, {userId: userId, studentId: studentId});
    }
}
