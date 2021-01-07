<template>
    <!-- 框架顶部菜单区域 -->
    <div id="header">
        <template v-if="layout !== 'layout-head'">
            <!-- 左侧菜单功能项 -->
            <div class="prev-menu">
                <!-- 左侧缩进功能键 -->
                <div class="menu-item" @click="trigger()">
                    <AlignLeftOutlined v-if="collapsed" />
                    <!-- 左侧缩进功能键盘 -->
                    <AlignRightOutlined v-else />
                </div>
                <div class="menu-item" @click="refresh">
                    <!-- 刷新当前页面路由 -->
                    <ReloadOutlined />
                </div>
            </div>
        </template>

        <template v-else>
            <div class="head-logo">
                <Logo></Logo>
            </div>
            <div class="head-menu">
                <Menu></Menu>
            </div>
        </template>

        <!-- 实现综合布局方式 -->
        <div v-if="layout == 'layout-comp'" class="comp-menu">
            <template :key="index" v-for="(route, index) in routes">
                <router-link
                    :to="toPath(route)"
                    class="menu-item"
                    :class="[active === route.path ? 'is-active' : '']"
                >
                    <span>{{ (route.meta || {}).title }}</span>
                </router-link>
            </template>
        </div>

        <!-- 右侧菜单功能项 基本公用 -->
        <div class="next-menu">
            <div class="menu-item" v-if="!fullscreen" @click="full(1)">
                <ExpandOutlined />
            </div>
            <div class="menu-item" v-else @click="full(2)">
                <CompressOutlined />
            </div>

            <a-dropdown class="notice-item">
                <BellOutlined />
                <template #overlay>
                    <a-menu class="notice-dropdown">
                        <a-tabs>
                            <a-tab-pane key="1" tab="通知">Content of Tab Pane 1</a-tab-pane>
                            <a-tab-pane key="2" tab="公告">Content of Tab Pane 2</a-tab-pane>
                            <a-tab-pane key="3" tab="私信">Content of Tab Pane 3</a-tab-pane>
                            <a-tab-pane key="4" tab="任务">Content of Tab Pane 3</a-tab-pane>
                        </a-tabs>
                    </a-menu>
                </template>
            </a-dropdown>
            <div class="menu-item">
                <GlobalOutlined />
            </div>
            <a-dropdown class="avatar-item">
                <a-avatar
                    src="https://portrait.gitee.com/uploads/avatars/user/1611/4835367_Jmysy_1578975358.png"
                ></a-avatar>
                <template #overlay>
                    <a-menu class="avatar-dropdown">
                        <a-menu-item key="0">
                            <router-link to="/account/center">个人中心</router-link>
                        </a-menu-item>
                        <a-menu-item key="1">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="http://www.taobao.com/"
                            >系统设置</a>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3">
                            <a-menu-item @click="logOut">注销登录</a-menu-item>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <div class="menu-item" @click="setting()">
                <!-- 主题设置隐显键 -->
                <MoreOutlined />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Menu from '../menu/index.vue';
import Logo from '../logo/index.vue';
import { RouteRecordRaw } from 'vue-router';
import _path from 'path';
import {
    AlignLeftOutlined,
    AlignRightOutlined,
    MoreOutlined,
    ExpandOutlined,
    CompressOutlined,
    ReloadOutlined,
    GlobalOutlined,
    BellOutlined,
} from '@ant-design/icons-vue';
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout, Permission } from '@/store/modules';
import { filter } from 'lodash';
import { nextTick } from 'vue';
import { message } from 'ant-design-vue';

@Component({
    components: {
        AlignLeftOutlined,
        AlignRightOutlined,
        MoreOutlined,
        ExpandOutlined,
        CompressOutlined,
        ReloadOutlined,
        GlobalOutlined,
        Menu,
        Logo,
        BellOutlined,
    } as any,
})
export default class extends Vue {

    public get layout() {
        return Layout.layout;
    }

    public get collapsed() {
        return Layout.collapsed;
    }

    public get fullscreen() {
        return Layout.fullscreen;
    }

    public get menuModel() {
        return this.layout === 'layout-head' ? 'horizontal' : 'inline';
    }

    public get theme() {
        return Layout.theme;
    }

    public get routes() {
        return filter(Permission.dynamicRoutes, r => (r.meta || {}).hidden !== true);
    }

    public active: string;

    constructor() {
        super(arguments);
        this.active = '';
    }

    public mounted() {
        this.active = this.$route.matched[0].path;
        this.$watch('$route', () => this.active = this.$route.matched[0].path);
    }

    public toPath(route: RouteRecordRaw) {
        let { redirect, children, path } = route;
        if (redirect) {
            return redirect;
        }
        while (children && children[0]) {
            path = _path.resolve(path, children[0].path);
            children = children[0].children;
        }
        return path;
    }

    public async refresh() {
        Layout.updateRouterActive();
        await nextTick();
        Layout.updateRouterActive();
        message.info("刷新成功");
    }

    public async logOut() {
        Permission.setRemoveToken();
        window.location.reload();
    }

    public full(num: number) {
        num = num || 1;
        num = num * 1;
        const docElm: any = document.documentElement;
        switch (num) {
            case 1:
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                }
                break;
            case 2:
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    (document as any).mozCancelFullScreen();
                } else if ((document as any).webkitCancelFullScreen) {
                    (document as any).webkitCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    (document as any).msExitFullscreen();
                }
                break;
        }
        this.updateFullscreen();
    }

    public trigger() {
        Layout.toggleSidebar();
    }

    public setting() {
        Layout.toggleSetting();
    }

    public updateFullscreen() {
        Layout.updateFullscreen();
    }
}
</script>
