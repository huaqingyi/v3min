import { createRouter, createWebHistory, RouteRecordName, RouteRecordRaw } from 'vue-router';
import { map } from 'lodash';

export const routes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'notall',
        component: () => import('@/pages/login/login.vue'),
        meta: { hidden: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/login.vue'),
        meta: { hidden: true },
    },
];

export function resetRouter() {
    map(router.getRoutes(), ({ name }) => name && router.hasRoute(name) && router.removeRoute(name));
    map(routes, route => router.addRoute(route));
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
