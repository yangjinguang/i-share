import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {Banner} from '../utils/types/banner';

export class SettingsApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public uploadToken(): Promise<string> {
        return this.http.get(`${config.apiBaseUrl}/settings/upload-token`);
    }

    public getBanners(): Promise<Banner[]> {
        return this.http.get(`${config.apiBaseUrl}/settings/banner`);
    }

    public updateBanners(images: string[]): Promise<Banner> {
        return this.http.put(`${config.apiBaseUrl}/settings/banner`, images);
    }
}
