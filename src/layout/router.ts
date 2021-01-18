import { t } from '@/locales';
import { RouteRecordRaw } from 'vue-router';
import Layout from './index.vue';

export default [
    {
        path: '/',
        // component: Layout,
        meta: { hidden: true },
        redirect: '/cluster',
    },
    {
        path: '/cluster',
        component: Layout,
        children: [
            {
                path: '',
                name: 'cluster',
                meta: { title: t('routes.cluster'), icon: 'ClusterOutlined', fixed: true },
                component: () => import('@/pages/cluster/index.vue'),
            },
        ]
    },
    {
        path: '/project',
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: t('routes.project'), icon: 'FundProjectionScreenOutlined', fixed: true },
                component: () => import('@/pages/project/index.vue'),
            },
        ]
    },
    {
        path: '/template',
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: t('routes.template'), icon: 'FormOutlined', fixed: true },
                component: () => import('@/pages/template/index.vue'),
            },
        ]
    },
    {
        path: '/task',
        component: Layout,
        children: [
            {
                path: '',
                meta: { title: t('routes.task'), icon: 'BgColorsOutlined', fixed: true },
                component: () => import('@/pages/task/index.vue'),
            },
        ]
    },
] as RouteRecordRaw[];