import { t } from '@/locales';
import { RouteRecordRaw } from 'vue-router';

export default [
    {
        path: '/',
        component: () => import('./index.vue'),
        meta: { hidden: true },
        redirect: '/dashboard/index',
    },
    {
        path: '/dashboard',
        meta: { title: t('dashboard.analysis'), icon: 'HomeOutlined' },
        component: () => import('./index.vue'),
        children: [
            {
                path: 'index',
                meta: { title: t('dashboard.analysis'), icon: 'DashboardOutlined', fixed: true },
                component: () => import('@/pages/dashboard/dashboard.vue'),
            },
            {
                path: 'tables',
                meta: { title: t('dashboard.welcome'), icon: 'HomeOutlined', fixed: true },
                component: () => import('@/pages/tables/tables.vue'),
            }
        ]
    },
    {
        path: '/test',
        meta: { title: '测试', icon: 'HomeOutlined' },
        component: () => import('./index.vue'),
        redirect: '/test/index',
        children: [
            {
                path: 'index',
                meta: { title: '测试页', icon: 'DashboardOutlined', fixed: true },
                component: () => import('@/pages/dashboard/dashboard.vue'),
            },
            {
                path: 'tables',
                meta: { title: '测试页1', icon: 'HomeOutlined', fixed: true },
                component: () => import('@/pages/tables/tables.vue'),
            }
        ]
    },
] as RouteRecordRaw[];