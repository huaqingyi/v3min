/*
 * @FilePath: /core-factory/src/interceptors/request.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-16 10:20:32
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-16 12:43:12
 * @debugger: 
 */
import { AxiosInstance } from 'axios';
import { app } from '../core/core';

const $http: AxiosInstance = app.config.globalProperties.$http;

$http.interceptors.request.use((config) => {
    return config;
});

$http.interceptors.response.use((response) => {
    return response;
});
