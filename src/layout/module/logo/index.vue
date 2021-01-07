<template>
    <div id="logo">
        <!-- 根据侧边收缩状态决定隐显内容 -->
        <div v-if="!collapsed">
            <span class="title">{{ title }}</span>
        </div>
        <!-- 根据侧边收缩状态决定隐显内容 -->
        <span v-else>
            <img class="image" :src="image" />
        </span>
    </div>
</template>
<script lang="ts">
import config from '@/config/theme.config';
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout } from '@/store/modules';

@Component
export default class extends Vue {
    public get collapsed() {
        return Layout.collapsed;
    }
    public image: string;
    public title: string;
    constructor() {
        super(arguments);
        this.image = config.image;
        this.title = config.title;
    }
}
</script>