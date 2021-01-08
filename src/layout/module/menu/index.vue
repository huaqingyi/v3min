<template>
    <div id="menu">
        <a-menu
            v-model:openKeys="openKey"
            :selectedKeys="selectKey"
            :mode="menuModel"
            :theme="menuTheme"
            @openChange="openChange"
        >
            <sub-menu
                v-for="route in menu"
                :key="rootPath + route.path"
                :item="route"
                :base-path="rootPath + route.path"
                :level="0"
            />
        </a-menu>
    </div>
</template>
<script lang="ts">
import SubMenu from './SubMenu.vue';
import { RouteRecordRaw } from 'vue-router';
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout, Permission } from '@/store/modules';
import { computed, watch } from 'vue';

@Component({
    components: {
        SubMenu,
    },
})
export default class extends Vue {
    public get routes() {
        return this.$router.options.routes;
    }

    public get theme() {
        return Layout.theme;
    }

    public get layout() {
        return Layout.layout;
    }

    public get menuModel() {
        return this.layout === 'layout-head' ? 'horizontal' : 'inline';
    }

    public get menuTheme() {
        return this.theme === 'theme-dark' || this.theme === 'theme-night' ? 'dark' : 'light';
    }

    public get storeOpenKey() {
        return Layout.openKey;
    }

    public get activeKey() {
        return Layout.activeKey;
    }

    public get openKey() {
        return [...this.storeOpenKey];
    }

    public get selectKey() {
        return [this.activeKey];
    }

    public rootPath: string;
    public menu: RouteRecordRaw[];
    public state: { menu: RouteRecordRaw[]; };

    constructor() {
        super(arguments);
        this.rootPath = '';
        this.menu = Permission.dynamicRoutes;
        this.state = { menu: this.menu };
    }

    public mounted() {
        watch(computed(() => this.layout), this.changeLayout.bind(this));
        watch(computed(() => this.$route.fullPath), this.dynamicRoute.bind(this));
        this.dynamicRoute();
    }

    public dynamicRoute() {
        const { matched } = this.$route;
        const needOpenKeys = matched
            .slice(0, matched.length - 1)
            .map((m) => m.path);
        const openKeys = [...this.storeOpenKey];
        needOpenKeys.forEach((nk) => !openKeys.includes(nk) && openKeys.push(nk));
        this.changeLayout(this.layout);
        if (this.layout !== 'layout-head') {
            Layout.updateOpenKey({ openKeys });
        } else {
            Layout.clearOpenKey();
        }
    }

    public changeLayout(model: string) {
        if (model === 'layout-comp') {
            let topPath = this.$route.matched[0].path;
            const menu = (this.state.menu.find(r => r.path === topPath) || {}).children || [];
            this.menu = menu;
            this.rootPath = topPath + '/';
        } else {
            this.menu = this.state.menu;
            this.rootPath = '';
        }
    }

    public openChange(openKeys: string[]) {
        Layout.updateOpenKey({ openKeys });
    }
}
</script>
