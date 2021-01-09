import { App } from 'vue';
import Axios, { AxiosInstance } from 'axios';
import config from '@/config/request';

export function requestPrototype(app: App) {
    const $http: AxiosInstance = Axios.create(config);
    app.config.globalProperties.$http = $http;
    return app;
}