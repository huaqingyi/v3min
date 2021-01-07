import { App } from 'vue';
import Axios, { AxiosInstance } from 'axios';
import { message } from 'ant-design-vue';
import { Service } from 'vue-pandora-decorators';
import config from '@/config/request';

export function requestIntercepter(app: App) {
    const $http: AxiosInstance = Axios.create(config);

    $http.interceptors.request.use((config) => {
        let token = sessionStorage.getItem('token') || '';
        config.headers = {
            ...config.headers, token,
            'Access-Control-Expose-Headers': 'sessionToken, freshtoken'
        }
        return config;
    });

    $http.interceptors.response.use((response) => {
        if (response.headers && response.headers.sessiontoken) {
            sessionStorage.setItem('token', response.headers.token);
        }

        let { data } = response;
        if (data && data.errno && data.errno === 1000) {
            sessionStorage.removeItem('sessiontoken');
            sessionStorage.removeItem('freshtoken');
            sessionStorage.removeItem('userInfo');
            message.error({ title: '错误', message: '登录超时, 请重新登录' });
            window.location.reload();
        }
        return response;
    });

    Service.prototype.http = $http;
    app.config.globalProperties.$http = $http;

    return app;
}