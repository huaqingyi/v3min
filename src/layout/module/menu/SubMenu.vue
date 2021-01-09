<template>
    <template v-if="(item.meta || {}).hidden !== true">
        <!-- if item.children is not null 渲染 a-sub-menu -->
        <a-sub-menu :key="item.path" v-if="item.children && item.children.length > 0">
            <template v-slot:title>
                <span>
                    <comp-var v-if="level === 0" :component="MenuIcon" />
                    <span v-else>
                        <div class="indent"></div>
                    </span>
                    <span>{{ $t((item.meta || {}).title) }}</span>
                </span>
            </template>
            <!-- 递归 item.children -->
            <sub-menu
                v-for="child in item.children"
                :key="resolvePath(child.path)"
                :item="child"
                :level="level + 1"
                :base-path="resolvePath(child.path)"
            />
        </a-sub-menu>
        <!-- if item.chilren is null 渲染 a-menu-item -->
        <a-menu-item v-bind="$attrs" :key="resolvePath(item.path, true)" v-else>
            <router-link :to="resolvePath(item.path, true)">
                <!-- <MenuIcon v-if="level && level === 0" /> -->
                <comp-var v-if="level && level === 0" :component="MenuIcon" />
                <span v-else>
                    <div class="indent"></div>
                </span>
                <span>{{ $t((item.meta || {}).title) }}</span>
            </router-link>
        </a-menu-item>
    </template>
</template>

<script lang="ts">
import path from 'path';
import * as Icons from '@ant-design/icons-vue';
import { Component, prop, Vue, WithDefault } from 'vue-pandora-decorators';
import { useI18n } from 'vue-i18n';

export class Props {
    public item: any;
    public basePath: WithDefault<string>;
    public level: number;
    constructor() {
        this.item = prop({ type: Object, required: true });
        this.basePath = prop({ type: String, default: '' });
        this.level = prop({ type: Number, required: true });
    }
}

@Component({ name: 'SubMenu' })
export default class extends Vue.with(Props) {

    public get MenuIcon() {
        return (Icons as any)[(this.item.meta || {}).icon] || {};
    }

    public resolvePath(routePath: string, single?: boolean) {
        if (/^(https?:|mailto:|tel:)/.test(routePath)) {
            return routePath;
        }
        if (single) {
            return this.basePath;
        }
        // 当处于 comp 模式下拼接相关路由
        return path.resolve(this.basePath, routePath);
    }
}
</script>
<style>
.indent {
    width: 15px;
    display: inline-block;
}
</style>
