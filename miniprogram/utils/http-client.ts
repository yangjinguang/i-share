import {ApiResponse} from './types/api-response';
import RequestSuccessCallbackResult = WechatMiniprogram.RequestSuccessCallbackResult;

// const app = getApp<IMyApp>();

export class HttpClient {
    private header: { [key: string]: string };

    constructor() {
        this.header = {
            'content-type': 'application/json'
        };
    }

    private urlGen(url: string, query: { [key: string]: string }): string {
        let queryArr: string[] = [];
        Object.keys(query).forEach(key => {
            queryArr.push(key + '=' + query[key as keyof object]);
        });
        if (queryArr.length > 0) {
            return `${url}?${queryArr.join('&')}`;
        } else {
            return url;
        }
    }

    private headerGen(header?: { [key: string]: string }) {
        const token = wx.getStorageSync('accessToken');
        if (token) {
            this.header['Authorization'] = token;
        }
        if (header) {
            return (<any>Object).assign(this.header, header);
        }
        return this.header;
    }

    private errorHandler(res: RequestSuccessCallbackResult) {
        const apiRes = res.data as ApiResponse;
        switch (res.statusCode) {
            case 401:
                wx.removeStorageSync('accessToken');
                wx.switchTab({
                    url: '/pages/my/my'
                });
                break;
            case 400:
            case 500:
                wx.showToast({
                    title: apiRes.message || '未知错误',
                    icon: 'none',
                    duration: 1000
                });
                break;
            default:

                break;
        }
    }

    public get(url: string, query?: { [key: string]: any }, header?: { [key: string]: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.request({
                url: query ? this.urlGen(url, query) : url,
                method: 'GET',
                header: this.headerGen(header),
                success: (res) => {
                    this.errorHandler(res);
                    const resData = res.data as ApiResponse;
                    if (resData.code != 200) {
                        reject(resData);
                    } else {
                        resolve(resData.data);
                    }
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    public post(url: string, data?: any, header?: { [key: string]: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                method: 'POST',
                header: this.headerGen(header),
                data: data,
                success: (res) => {
                    this.errorHandler(res);
                    const resData = res.data as ApiResponse;
                    if (resData.code != 200) {
                        reject(resData);
                    } else {
                        resolve(resData.data);
                    }
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    public put(url: string, data?: any, header?: { [key: string]: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                method: 'PUT',
                header: this.headerGen(header),
                data: data,
                success: (res) => {
                    this.errorHandler(res);
                    const resData = res.data as ApiResponse;
                    if (resData.code != 200) {
                        reject(resData);
                    } else {
                        resolve(resData.data);
                    }
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }

    public delete(url: string, query?: { [key: string]: string }, header?: { [key: string]: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            wx.request({
                url: query ? this.urlGen(url, query) : url,
                method: 'DELETE',
                header: this.headerGen(header),
                success: (res) => {
                    this.errorHandler(res);
                    const resData = res.data as ApiResponse;
                    if (resData.code != 200) {
                        reject(resData);
                    } else {
                        resolve(resData.data);
                    }
                },
                fail: (err) => {
                    reject(err);
                }
            });
        });
    }
}
