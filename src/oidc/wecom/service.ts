import Axios, { AxiosInstance } from 'axios';
import { WXUserInfo } from 'wx-auth';

export class Service {
    public http: AxiosInstance;
    public accessToken?: string;
    public appName?: string;
    public userInfo?: WXUserInfo;
    constructor() {
        this.http = Axios.create({
            baseURL: 'http://weichat-certcenter.talefun.com/',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public async getAccessToken(appName: string): Promise<string> {
        this.appName = appName;
        return await this.http.get('/auth/weichat/getAccessToken', {
            params: { appName }
        }).then(resp => resp.data).then((resp) => {
            if (
                resp &&
                resp.data &&
                resp.data['talefun-weichat-certcenter'] &&
                resp.data['talefun-weichat-certcenter'].accessToken
            ) {
                this.accessToken = resp.data['talefun-weichat-certcenter'].accessToken;
                return resp.data['talefun-weichat-certcenter'].accessToken;
            } else {
                console.error('appName 获取 token 错误, 请检查 .');
                console.error('==================================');
                console.log(resp);
                console.error('==================================');
                return '';
            }
        });
    }

    public async getUserInfo(code: string): Promise<WXUserInfo | false> {
        if (!this.appName) {
            console.error('请配置 appName .');
            return false;
        }
        if (!this.accessToken) {
            console.error('appName 获取 token 错误, 请检查 .');
            return false;
        }
        return await this.http.get('/auth/weichat/getWeichatUserInfo', {
            params: { appName: this.appName, code, accToken: this.accessToken }
        }).then(resp => {
            sessionStorage.setItem('freshtoken', resp.headers.freshtoken);
            sessionStorage.setItem('sessiontoken', resp.headers.sessiontoken);
            return resp.data;
        }).then(resp => {
            if (
                resp &&
                resp.data
            ) {
                if (
                    resp.data['talefun-weichat-certcenter'] &&
                    resp.data['talefun-weichat-certcenter'].userInfo
                ) {
                    this.userInfo = resp.data['talefun-weichat-certcenter'].userInfo;
                    return resp.data['talefun-weichat-certcenter'].userInfo;
                } else {
                    return resp.data;
                }
            } else {
                console.error('获取 userInfo 错误, 请检查 .');
                console.error('==================================');
                console.log(`accessToken: ${this.accessToken}, appName: ${this.appName}, code: ${code}`);
                console.log(resp);
                console.error('==================================');
                return false;
            }
        });
    }
}
