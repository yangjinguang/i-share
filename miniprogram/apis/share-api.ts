import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {Share} from '../utils/types/share';
import {ShareListResponse} from '../utils/types/share-list-response';
import {ShareLike} from '../utils/share-like';
import {ShareComment} from '../utils/share-comment';

export class ShareApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public query(classId: number, page: number, size: number): Promise<ShareListResponse> {
        let query = <any>{
            page: page,
            size: size
        };
        if (classId) {
            query.classId = classId;
        }
        return this.http.get(`${config.apiBaseUrl}/share`, query);
    }

    public create(newShare: Share): Promise<Share> {
        return this.http.post(`${config.apiBaseUrl}/share`, newShare);
    }

    public getOne(shareId: number): Promise<Share> {
        return this.http.get(`${config.apiBaseUrl}/shares/byId/${shareId}`);
    }

    public getMy(page: number, size: number): Promise<ShareListResponse> {
        return this.http.get(`${config.apiBaseUrl}/shares/my`, {page: page, size: size});
    }

    public delete(shareId: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/shares/${shareId}`);
    }

    public like(shareId: number): Promise<string> {
        return this.http.put(`${config.apiBaseUrl}/share/${shareId}/like`);
    }

    public getLikes(shareId: number): Promise<ShareLike[]> {
        return this.http.get(`${config.apiBaseUrl}/share/${shareId}/like`);
    }

    public comment(shareId: number, comment: string): Promise<string> {
        return this.http.put(`${config.apiBaseUrl}/share/${shareId}/comment`, {comment: comment});
    }

    public getComments(shareId: number): Promise<ShareComment[]> {
        return this.http.get(`${config.apiBaseUrl}/share/${shareId}/comment`);
    }
}
