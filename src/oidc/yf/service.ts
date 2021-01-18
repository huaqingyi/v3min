import Axios, { AxiosInstance } from 'axios';

export class Service {
    public http: AxiosInstance;
    public wkconfig: any;

    constructor() {
        this.wkconfig = {};
        this.http = Axios.create({
            baseURL: 'http://weichat-certcenter.talefun.com/',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public async wellKnown(wellKnown: string): Promise<any> {
        this.wkconfig = await this.http.get('/auth/yf/wellKnown', {
            params: { wellKnown }
        }).then(resp => resp.data);
        return this.wkconfig;
    }

    // tslint:disable-next-line:variable-name
    public async token(code: string, redirect_uri: string, client_id: string, client_secret: string) {
        const { token_endpoint } = this.wkconfig;
        return this.http.post('/auth/yf/token', {
            client_id, client_secret, code, grant_type: 'authorization_code',
            redirect_uri, token_endpoint,
        }).then(({ data }) => ({ ...data }));
    }

    // tslint:disable-next-line:variable-name
    public async getUserInfo(access_token: string) {
        const { userinfo_endpoint } = this.wkconfig;
        return this.http.post('/auth/yf/userinfo', {
            access_token, userinfo_endpoint,
        });
    }
}
