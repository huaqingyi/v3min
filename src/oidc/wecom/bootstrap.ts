import { Configuration } from './types';
import { find, isUndefined } from 'lodash';
import { DevlopmentUser } from '../types';
import def from './defineds';
import { Service } from './service';
import { Modal } from 'ant-design-vue';
declare const PRODUCTION: boolean;
declare const TOKEN: string;

export async function getCode(config: Configuration) {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?`;
        url = `${url}appid=${config.config.appId}&`;
        url = `${url}redirect_uri=${encodeURIComponent(window.location.href.replace('/index.html', '').split('#').shift() || '')}&`;
        url = `${url}response_type=code&`;
        url = `${url}state=${config.config.nonceStr}&`;
        url = `${url}response_type=code&`;
        url = `${url}scope=snsapi_base`;
        url = `${url}#wechat_redirect`;
        window.location.href = url;
    } else {
        let url = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?`;
        url = `${url}appid=${config.config.appId}&`;
        url = `${url}agentid=${config.agentid}&`;
        url = `${url}redirect_uri=${encodeURIComponent(window.location.href.split('#').shift() || '')}&`;
        url = `${url}state=${config.config.nonceStr}`;
        window.location.href = url;
    }
}

export async function bootstrap(config: Configuration, devUser?: DevlopmentUser) {

    config = def(config);

    if (PRODUCTION !== true) {
        const userInfo: string = JSON.stringify(devUser || new DevlopmentUser());
        await sessionStorage.setItem('userInfo', userInfo);

        try {
            if (TOKEN && !isUndefined(TOKEN) && TOKEN !== 'undefined') {
                sessionStorage.setItem('sessiontoken', TOKEN);
                sessionStorage.setItem('freshtoken', TOKEN);
            } else {
                const userInfo: string = sessionStorage.getItem('userInfo') || '';
                sessionStorage.setItem('sessiontoken', userInfo);
                sessionStorage.setItem('freshtoken', userInfo);
            }
        } catch (e) { }
    }

    if ((!sessionStorage.getItem('sessiontoken')) && (!sessionStorage.getItem('freshtoken')) && (!sessionStorage.getItem('userInfo'))) {
        const domScript: any = document.createElement('script');
        await new Promise(r => {
            domScript.onload = domScript.onreadystatechange = r;
            domScript.src = `${config.type}://res.wx.qq.com/open/js/jweixin-1.2.0.js`;
            document.getElementsByTagName('head')[0].appendChild(domScript);
        });
        await console.log('init wx sdk to application success ...');

        let code = '';

        if (window.location.href.indexOf('code=') === -1) {
            return await getCode(config);
        } else {
            code = (find((window.location.href.split('?').pop() || '').split('&'), item => {
                return item.indexOf('code=') !== -1;
            }) || '').split('code=').pop() || '';

            const service = new Service();
            await service.getAccessToken(config.appName);
            const userInfo: DevlopmentUser | false = await service.getUserInfo(code);

            if (userInfo !== false) {
                if ((userInfo as any).errcode !== 0) {
                    Modal.confirm({
                        title: `错误代码: ${(userInfo as any).errcode}`,
                        content: `错误信息: ${(userInfo as any).errmsg}`,
                        onOk: () => getCode(config),
                    });
                    return Promise.reject(userInfo);
                } else {
                    window.history.pushState(null, '', '/');
                    return await sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                }
            } else {
                Modal.confirm({
                    title: `错误代码: ${(userInfo as any).errcode}`,
                    content: `错误信息: ${(userInfo as any).errmsg}`,
                    onOk: () => getCode(config),
                });
                return Promise.reject(userInfo);
            }
        }
    }
}