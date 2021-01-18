import { App } from 'vue';
import { AxiosInstance } from 'axios';
import { message } from 'ant-design-vue';
import { Service } from 'vue-pandora-decorators';
declare const LOCAL: string;
declare const DEBUGTOKEN: string;

export function requestIntercepter(app: App) {
    const $http: AxiosInstance = app.config.globalProperties.$http;

    $http.interceptors.request.use((config) => {
        let sessiontoken = sessionStorage.getItem('sessiontoken') || '';
        let freshtoken = sessionStorage.getItem('freshtoken') || '';
        const headers: any = {
            ...config.headers, sessiontoken, freshtoken,
            'Access-Control-Expose-Headers': 'sessionToken, freshtoken'
        };
        if (LOCAL === 'development') {
            headers.DebugToken = DEBUGTOKEN;
        }
        config.headers = headers;
        return config;
    });

    $http.interceptors.response.use((response) => {
        if (response.headers && response.headers.sessiontoken) {
            sessionStorage.setItem('sessiontoken', response.headers.sessiontoken);
        }
        if (response.headers && response.headers.freshtoken) {
            sessionStorage.setItem('freshtoken', response.headers.sessiontoken);
        }

        let { data } = response;
        if (data && data.errno && data.errno === 1000) {
            sessionStorage.removeItem('sessiontoken');
            sessionStorage.removeItem('freshtoken');
            sessionStorage.removeItem('userInfo');
            message.error({ title: '错误', message: '登录超时, 请重新登录' });
            window.location.reload();
        }
        if ((data?.data || {})['com.talefun.server.ask-tasker-server']) {
            const resp = data.data['com.talefun.server.ask-tasker-server'];
            delete data.data;
            data = { ...data, ...resp };
        }
        return data;
    });

    Service.prototype.http = $http;

    return app;
}