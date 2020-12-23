<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <template #breadcrumb>
            <transition-group>
                <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
                    <span
                        v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
                        class="no-redirect"
                    >{{ (item.meta || {}).title }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ (item.meta || {}).title }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </template>
    </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from 'path-to-regexp';
import { Component, Vue } from 'vue-pandora-decorators';
import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

@Component({
    name: 'Breadcrumb',
})
export default class extends Vue {
    public breadcrumbs: RouteRecordRaw[];

    constructor() {
        super(arguments);
        this.breadcrumbs = [];
    }

    public created() {
        this.$watch('$route', this.onRouteChange.bind(this));
        this.getBreadcrumb();
    }

    private onRouteChange(route: RouteLocationNormalizedLoaded) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
            return;
        }
        this.getBreadcrumb();
    }

    public getBreadcrumb() {
        let matched = this.$route.matched.filter(
            item => item.meta && item.meta.title
        );
        // const first = matched[0];
        // if (!this.isDashboard(first)) {
        //     matched = [
        //         {
        //             path: '/dashboard',
        //             meta: { title: 'dashboard' },
        //         } as RouteRecord,
        //     ].concat(matched);
        // }
        this.breadcrumbs = matched.filter(item => {
            return (
                item.meta && item.meta.title && item.meta.breadcrumb !== false
            );
        });
    }

    // public isDashboard(route: RouteRecord) {
    //     const name = route && route.name;
    //     if (!name) {
    //         return false;
    //     }
    //     return (
    //         name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    //     );
    // }

    public pathCompile(path: string) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route;
        const toPath = compile(path);
        return toPath(params);
    }

    public handleLink(item: any) {
        const { redirect, path } = item;
        if (redirect) {
            this.$router.push(redirect);
            return;
        }
        this.$router.push(this.pathCompile(path));
    }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
    font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
