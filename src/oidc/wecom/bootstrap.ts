import { Configuration } from './types';
import { WeChart, WXUserInfo } from 'wx-auth';
import { isUndefined } from 'lodash';
import { DevlopmentUser } from '../types';
import def from './defineds';
import { Service } from './service';
import { Modal } from 'ant-design-vue';
declare const PRODUCTION: boolean;
declare const TOKEN: string;

export async function bootstrap(config: Configuration, devUser?: DevlopmentUser) {

    config = def(config);

    const Wechart = WeChart.init(
        config.config,
        config.http || {} as any,
        config.agentid || '',
        config.type,
    );

    try {
        if (TOKEN && !isUndefined(TOKEN) && TOKEN !== 'undefined') {
            sessionStorage.setItem('sessiontoken', TOKEN);
            sessionStorage.setItem('freshtoken', TOKEN);
        }
    } catch (e) { }

    if (PRODUCTION !== true) {
        Wechart.cacheUser((devUser || new DevlopmentUser()) as any);
        if (
            (!sessionStorage.getItem('sessiontoken')) ||
            (!sessionStorage.getItem('freshtoken'))
        ) {
            const userInfo: string = sessionStorage.getItem('userInfo') || '';
            sessionStorage.setItem('sessiontoken', userInfo);
            sessionStorage.setItem('freshtoken', userInfo);
        }
    }

    if (
        (!sessionStorage.getItem('sessiontoken')) &&
        (!sessionStorage.getItem('freshtoken')) &&
        (!sessionStorage.getItem('userInfo'))
    ) {
        return Wechart.bootstrap(async () => {
            const service = new Service();
            await service.getAccessToken(config.appName);
            const userInfo: WXUserInfo | false = await service.getUserInfo(Wechart.code);
            if (userInfo !== false) {
                if ((userInfo as any).errcode !== 0) {
                    Modal.confirm({
                        title: `错误代码: ${(userInfo as any).errcode}`,
                        content: `错误信息: ${(userInfo as any).errmsg}`,
                        onOk: () => Wechart.reCode(),
                    });
                    return Promise.reject(userInfo);
                } else {
                    await Wechart.cacheUser(userInfo);
                    window.history.pushState(null, '', '/');
                    return await Wechart.checkUser();
                }
            } else {
                Modal.confirm({
                    title: `错误代码: ${(userInfo as any).errcode}`,
                    content: `错误信息: ${(userInfo as any).errmsg}`,
                    onOk: () => Wechart.reCode(),
                });
                return Promise.reject(userInfo);
            }
        });
    } else {
        return await Wechart.checkUser();
    }
}