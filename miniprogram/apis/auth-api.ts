import {AuthResponse} from '../utils/types/auth-response';
import {config} from '../utils/config';

export interface AuthPostData {
    code: string;
    encryptedData: string;
    iv: string;
    rawData: string;
    signature: string;
}

export class AuthApi {

    constructor() {
    }

    public auth(authPostData: AuthPostData): Promise<AuthResponse> {
        return new Promise((resolve, reject) => {
            wx.request({
                url: `${config.apiBaseUrl}/auth/login`,
                method: 'POST',
                data: authPostData,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: (res) => {
                    const authRes = (res.data as AuthResponse);
                    resolve(authRes);
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

}

