/*
 * @FilePath: /vue3-template/src/pages/decorator/router.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:03:33
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:22:21
 * @debugger: 
 */
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/layout.vue';

export default {
    path: '/decorator',
    name: 'decorator',
    component: Layout,
    redirect: '/decorator/test1',
    meta: {
        title: '修饰器',
        icon: 'el-icon-s-home',
        alwaysShow: true, // will always show the root menu
    },
    children: [
        {
            path: 'test1',
            name: 'decorator-test1',
            meta: { title: '测试1' },
            component: () => import('./test1/test1.vue'),
        },
        {
            path: 'test2',
            name: 'decorator-test2',
            meta: { title: '测试2' },
            component: () => import('./test2/test2.vue'),
        },
    ],
} as RouteRecordRaw;
