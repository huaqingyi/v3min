/*
 * @FilePath: /vue3-template/src/rotuer.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:03:33
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 14:10:19
 * @debugger: 
 */
import { map } from 'lodash';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        component: () => import('@/layout/layout.vue'),
        meta: { hidden: true },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'redirect',
                meta: { noCache: true },
                component: () => import('@/pages/redirect/index.vue'),
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/pages/error-page/404.vue'),
    },
    {
        path: '/401',
        component: () => import('@/pages/error-page/401.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error-page/404.vue'),
    },
];

export const resetRouter = () => {
    map(router.getRoutes(), ({ name }) => name && router.removeRoute(name));
    map(routes, route => {
        if (!route.name) { route.name = route.path; }
        return router.addRoute(route);
    });
};

export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});
