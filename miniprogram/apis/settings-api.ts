import {HttpClient} from '../utils/http-client';
import {config} from '../utils/config';
import {Swiper} from '../utils/types/swiper';

export class SettingsApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    public uploadToken(): Promise<string> {
        return this.http.get(`${config.apiBaseUrl}/settings/upload-token`);
    }

    public swiperGet(): Promise<Swiper> {
        return this.http.get(`${config.apiBaseUrl}/settings/swiper`);
    }

    public swiperUpdate(images: string[]): Promise<Swiper> {
        return this.http.put(`${config.apiBaseUrl}/settings/swiper`, {images: images});
    }
}
