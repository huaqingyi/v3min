<template>
    <a-layout id="layout" :class="[theme, layout]">
        <!-- 侧边栏 -->
        <a-layout-sider
            v-if="layout != 'layout-head'"
            :width="sideWitch"
            :collapsed="collapsed"
            :trigger="null"
            collapsible
            :class="fixedSide ? 'fixed-side' : ''"
        >
            <div class="layout-left-sider">
                <!-- 顶部图标 -->
                <Logo v-if="logo"></Logo>
                <!-- 垂直菜单 -->
                <Menu></Menu>
            </div>
        </a-layout-sider>
        <!-- 右边区域 -->
        <a-layout>
            <!-- header区域 -->
            <a-layout-header>
                <Header></Header>
            </a-layout-header>
            <!-- 中心区域 -->
            <a-layout-content :class="[fixedHeader ? 'fixedHeader' : '', tab ? 'muiltTab' : '']">
                <!-- 选项卡页面 -->
                <Tab v-if="tab"></Tab>
                <!-- main区域 -->
                <Content :style="{ overflow: fixedHeader ? 'auto' : '' }"></Content>
                <!-- 设置页面 -->
                <Setup></Setup>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import Content from './module/content/index.vue';
import Header from './module/header/index.vue';
import Logo from './module/logo/index.vue';
import Tab from './module/tab/index.vue';
import Setup from './module/setup/index.vue';
import Menu from './module/menu/index.vue';
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout } from '@/store/modules';

@Component({
    components: { Menu, Content, Header, Logo, Tab, Setup } as any,
})
export default class extends Vue {
    public get layout() {
        return Layout.layout;
    }
    public get collapsed() {
        return Layout.collapsed;
    }
    public get logo() {
        return Layout.logo;
    }
    public get tab() {
        return Layout.tab;
    }
    public get theme() {
        return Layout.theme;
    }
    public get sideWitch() {
        return Layout.sideWitch;
    }
    public get fixedHeader() {
        return Layout.fixedHeader;
    }
    public get fixedSide() {
        return Layout.fixedSide;
    }
}
</script>
