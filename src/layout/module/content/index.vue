<template>
    <!-- 框架 content 区域 , 路由内容页面 -->
    <div id="content">
        <router-view v-slot="{ Component }" v-if="routerActive">
            <transition :name="routerAnimate">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout } from '@/store/modules';

@Component
export default class extends Vue {
    public get routerActive() {
        return Layout.routerActive;
    }
    public get routerAnimate() {
        return Layout.routerAnimate;
    }
}
</script>
