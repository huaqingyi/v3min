<template>
    <!-- 框架 content 区域 , 路由内容页面 -->
    <div id="content">
        <router-view v-slot="{ Component }" v-if="routerActive">
            <transition :name="routerAnimate">
                <keep-alive :include="cacheViews">
                    <component :is="Component"></component>
                </keep-alive>
                <!-- <keep-alive :include="cacheViews">
                    <component :is="Component"></component>
                </keep-alive> -->
            </transition>
        </router-view>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout } from '@/store/modules';
import { filter } from 'lodash';

@Component
export default class extends Vue {

    public get routerActive() {
        return Layout.routerActive;
    }

    public get routerAnimate() {
        return Layout.routerAnimate;
    }

    public get cacheViews() {
        return filter<any[]>(Layout.panes, (pane: any) => pane.noCache !== true).map(({ name }) => name?.toString());
    }
}
</script>
