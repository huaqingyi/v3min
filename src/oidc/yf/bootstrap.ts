import { Configuration } from './types';
import { isUndefined } from 'lodash';
import { DevlopmentUser } from '../types';
import def from './defineds';
import { Service } from './service';
declare const PRODUCTION: boolean;
declare const TOKEN: string;

export async function bootstrap(config: Configuration) {

    const yf = def(config);
    const service = new Service();

    if (!yf.wellKnown) { throw new Error(`请配置 wellKnown 地址 ...`); }
    if (!yf.client_id) { throw new Error(`请配置 玉符的 Client ID ...`); }

    try {
        if (TOKEN && !isUndefined(TOKEN) && TOKEN !== 'undefined') {
            sessionStorage.setItem('sessiontoken', TOKEN);
            sessionStorage.setItem('freshtoken', TOKEN);
        }
        // tslint:disable-next-line:no-empty
    } catch (e) { }

    if (PRODUCTION !== true) {
        const userinfo = new DevlopmentUser();

        if (
            (!sessionStorage.getItem('sessiontoken')) ||
            (!sessionStorage.getItem('freshtoken'))
        ) {
            const userInfo: string = JSON.stringify(userinfo);
            sessionStorage.setItem('sessiontoken', userInfo);
            sessionStorage.setItem('freshtoken', userInfo);
        }
        return userinfo;
    }

    return Promise.resolve(yf).then(async yfc => {
        return yfc;
    }).then(async (yfc: any) => {
        return await service.wellKnown(yfc.wellKnown || '');
    }).then(async (yfc: any) => {
        const { authorization_endpoint } = yfc;
        const redirectUri: string = (location.href.split('?').shift() || '').split('#').shift() || '';
        if (location.href.indexOf('?code=') === -1) {
            let url = authorization_endpoint;
            url = `${url}?response_type=code`;
            url = `${url}&scope=openid%20profile%20email`;
            url = `${url}&client_id=${yf.client_id}`;
            url = `${url}&redirect_uri=${yf.redirect_uri || redirectUri}`;
            window.location.href = url;
        } else {
            const gets = (window.location.href.split('?').pop() || '').split('&');
            const code: string = (gets.find((g: string) => g.indexOf('code=') === 0) || '').replace('code=', '');
            return await service.token(
                code, yf.redirect_uri || redirectUri, yf.client_id, yf.client_secret
            ).then(resp => ({ ...resp, ...yfc })).catch(err => {
                let url = authorization_endpoint;
                url = `${url}?response_type=code`;
                url = `${url}&scope=openid%20profile%20email`;
                url = `${url}&client_id=${yf.client_id}`;
                url = `${url}&redirect_uri=${yf.redirect_uri || redirectUri}`;
                window.location.href = url;
                return Promise.reject(err);
            });
        }
        return yfc;
    }).then(async yfresp => {
        return await service.getUserInfo(yfresp.access_token);
    }).then(async ({ data, headers }) => {
        sessionStorage.setItem('freshtoken', headers.freshtoken);
        sessionStorage.setItem('sessiontoken', headers.sessiontoken);
        return data;
    });
}