/*
 * @FilePath: /vue3-template/src/layout/router.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:03:33
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 17:34:45
 * @debugger: 
 */
import { RouteRecordRaw } from 'vue-router';
import homeRouter from '@/pages/home/router';
import decoratorRouter from '@/pages/decorator/router';

export default [
    {
        path: '/',
        component: import('./layout.vue'),
        redirect: '/home',
    },
    homeRouter,
    decoratorRouter,
] as RouteRecordRaw[];
