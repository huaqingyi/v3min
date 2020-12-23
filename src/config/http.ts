/*
 * @FilePath: /core-factory/src/config/http.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-16 10:20:32
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-16 10:24:35
 * @debugger: 
 */
import { AxiosRequestConfig } from 'axios';

declare const HTTPBASE: string;

console.log(HTTPBASE);

export default {
    baseURL: HTTPBASE,
} as AxiosRequestConfig;
