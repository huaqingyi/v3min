<template>
    <div v-if="!item.meta || !item.meta.hidden" :class="metaClass">
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(theOnlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': isFirstLevel }"
                >
                    <i v-if="theOnlyOneChild.meta.icon" :class="[theOnlyOneChild.meta.icon, 'svg-icon-one']"></i>
                    <template #title>
                        <span>{{ theOnlyOneChild.meta.title }}</span>
                    </template>
                </el-menu-item>
            </sidebar-item-link>
        </template>
        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <i v-if="item.meta && item.meta.icon" :class="[item.meta.icon, 'svg-icon']"></i>
                <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :is-collapse="isCollapse"
                    :is-first-level="false"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
                />
            </template>
        </el-submenu>
    </div>
</template>

<script lang="ts">
import { resolve } from 'path';
import { Component, prop, Vue, WithDefault } from 'vue-pandora-decorators';
import { RouteRecordRaw } from 'vue-router';
import { isExternal } from '@/utils/validate';
import SidebarItemLink from './sidebarItemLink.vue';

export class Props {
    public item!: WithDefault<RouteRecordRaw>;
    public isCollapse!: WithDefault<boolean>;
    public isFirstLevel!: WithDefault<boolean>;
    public basePath!: WithDefault<string>;
    constructor() {
        this.item = prop({ type: Object, required: true });
        this.isCollapse = prop({ type: Boolean, default: false });
        this.isFirstLevel = prop({ type: Boolean, default: true });
        this.basePath = prop({ type: String, default: '' });
    }
}

@Component({
    // Set 'name' here to prevent uglifyjs from causing recursive component not work
    // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
    name: 'SidebarItem',
    components: {
        SidebarItemLink,
    },
})
export default class extends Vue.with(Props) {

    public get metaClass() {
        return [
            'menu-wrapper',
            this.isCollapse ? 'simple-mode' : 'full-mode',
            { 'first-level': this.isFirstLevel },
        ];
    }

    public get alwaysShowRootMenu() {
        if (this.item.meta && this.item.meta.alwaysShow) {
            return true;
        }
        return false;
    }

    public get showingChildNumber() {
        if (this.item.children) {
            const showingChildren = this.item.children.filter(item => {
                if (item.meta && item.meta.hidden) {
                    return false;
                } else {
                    return true;
                }
            });
            return showingChildren.length;
        }
        return 0;
    }

    public get theOnlyOneChild() {
        if (this.showingChildNumber > 1) {
            return null;
        }
        if (this.item.children) {
            for (let child of this.item.children) {
                if (!child.meta || !child.meta.hidden) {
                    return child;
                }
            }
        }
        // If there is no children, return itself with path removed,
        // because this.basePath already conatins item's path information
        return { ...this.item, path: '' };
    }

    public resolvePath(routePath: string) {
        if (isExternal(routePath)) {
            return routePath;
        }
        if (isExternal(this.basePath)) {
            return this.basePath;
        }
        return resolve(this.basePath, routePath);
    }
}
</script>

<style lang="scss">
.el-submenu.is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
}

.full-mode {
    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
            background-color: $subMenuHover !important;
        }
    }
}

.simple-mode {
    &.first-level {
        .submenu-title-noDropdown {
            padding: 0 !important;
            position: relative;

            .el-tooltip {
                padding: 0 !important;
            }
        }

        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title {
                padding: 0px !important;

                .el-submenu__icon-arrow {
                    display: none;
                }

                & > span {
                    visibility: hidden;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.svg-icon-one{
    margin-left: -3px;
    margin-right: 11px;
}
.svg-icon {
    width: 1em;
    height: 1em;
    display: inline-block;
    color: inherit;
    vertical-align: -0.15em;
    margin-right: 16px;
}

.simple-mode {
    .svg-icon {
        width: 1em;
        height: 1em;
        display: inline-block;
        color: inherit;
        vertical-align: -0.15em;
        margin-left: 20px;
    }
}
</style>
