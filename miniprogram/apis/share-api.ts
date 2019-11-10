import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {Share} from '../utils/types/share';
import {ShareListResponse} from '../utils/types/share-list-response';

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
        return this.http.get(`${config.apiBaseUrl}/shares/my`, {page: page.toString(), size: size.toString()});
    }

    public delete(shareId: number): Promise<string> {
        return this.http.delete(`${config.apiBaseUrl}/shares/${shareId}`);
    }

    public like(shareId: number): Promise<Share> {
        return this.http.put(`${config.apiBaseUrl}/shares/like/${shareId}`);
    }

    public createComment(shareId: number, commentBody: string): Promise<Share> {
        return this.http.post(`${config.apiBaseUrl}/shares/comment/${shareId}`, {body: commentBody});
    }
}
