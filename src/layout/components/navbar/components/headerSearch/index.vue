<template>
    <div id="header-search" :class="{ show: show }" class="header-search">
        <i class="search-icon el-icon-delete" name="search" @click.stop="click" />
        <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="Search"
            class="header-search-select"
            @change="change"
        >
            <el-option
                v-for="item in options"
                :key="item.path"
                :value="item"
                :label="((item.meta || {}).title || '').join(' > ')"
            />
        </el-select>
    </div>
</template>

<script lang="ts">
import path from 'path';
import Fuse from 'fuse.js'; // A lightweight fuzzy-search module
import { Component, Vue } from 'vue-pandora-decorators';
import { RouteRecordRaw } from 'vue-router';
import asyncRoutes from '@/layout/router';

@Component({
    name: 'HeaderSearch',
})
export default class extends Vue {
    public search: string;
    public show: boolean;
    public options: RouteRecordRaw[];
    public searchPool: RouteRecordRaw[];
    public fuse?: Fuse<RouteRecordRaw>;

    public get routes() {
        console.log(asyncRoutes);
        return asyncRoutes;
    }

    constructor() {
        super(arguments);
        this.search = '';
        this.show = false;
        this.options = [];
        this.searchPool = [];
    }

    public async created() {
        this.$watch('routes', this.onRoutesChange.bind(this));
        this.$watch('searchPool', this.onSearchPoolChange.bind(this));
        this.$watch('show', this.onShowChange.bind(this));
    }

    private onRoutesChange() {
        this.searchPool = this.generateRoutes(this.routes);
    }

    private onSearchPoolChange(value: RouteRecordRaw[]) {
        this.initFuse(value);
    }

    private onShowChange(value: boolean) {
        if (value) {
            document.body.addEventListener('click', this.close);
        } else {
            document.body.removeEventListener('click', this.close);
        }
    }

    public async mounted() {
        this.searchPool = this.generateRoutes(this.routes);
    }

    public click() {
        this.show = !this.show;
        if (this.show) {
            this.$refs.headerSearchSelect &&
                (this.$refs.headerSearchSelect as HTMLElement).focus();
        }
    }

    public close() {
        this.$refs.headerSearchSelect &&
            (this.$refs.headerSearchSelect as HTMLElement).blur();
        this.options = [];
        this.show = false;
    }

    public change(route: RouteRecordRaw) {
        this.$router.push(route.path);
        this.search = '';
        this.options = [];
        this.$nextTick(() => {
            this.show = false;
        });
    }

    public initFuse(list: RouteRecordRaw[]) {
        this.fuse = new Fuse(list, {
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            keys: [
                {
                    name: 'title',
                    weight: 0.7,
                },
                {
                    name: 'path',
                    weight: 0.3,
                },
            ],
        });
    }

    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    private generateRoutes(
        routes: RouteRecordRaw[],
        basePath = '/',
        prefixTitle: string[] = []
    ) {
        let res: RouteRecordRaw[] = [];

        for (const router of routes) {
            // skip hidden router
            if (router.meta && router.meta.hidden) {
                continue;
            }

            const data: RouteRecordRaw = {
                path: path.resolve(basePath, router.path),
                meta: {
                    title: [...prefixTitle],
                },
            } as any;

            // recursive child routes
            if (router.children) {
                const tempRoutes = this.generateRoutes(
                    router.children,
                    data.path,
                    (data.meta || {}).title
                );
                if (tempRoutes.length >= 1) {
                    res = [...res, ...tempRoutes];
                }
            }
        }
        return res;
    }

    public querySearch(query: string) {
        if (query !== '') {
            if (this.fuse) {
                this.options = (this.fuse as any).search(query) as any;
            }
        } else {
            this.options = [];
        }
    }
}
</script>

<style lang="scss" scoped>
.header-search {
    font-size: 0 !important;

    .search-icon {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }

    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;

        .el-input__inner {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }

    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>
