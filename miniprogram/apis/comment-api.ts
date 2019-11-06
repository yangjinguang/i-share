import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';

export class CommentApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public delete(commentId: string): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/comments/${commentId}`);
    }
}