/*
 * @FilePath: /vue3-template/src/pages/home/router.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:03:33
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 15:54:47
 * @debugger: 
 */
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/layout.vue';

export default {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    children: [
        {
            path: 'index',
            name: 'home-index',
            component: () => import('@/pages/home/home.vue'),
            meta: {
                title: '首页',
                icon: 'el-icon-s-home',
                affix: true,
                noCache: true,
            },
        }
    ],
} as RouteRecordRaw;
