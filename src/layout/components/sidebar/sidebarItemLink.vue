<!--
 * @FilePath: /vue3-template/src/layout/components/sidebar/sidebarItemLink.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 16:01:22
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 16:46:34
 * @debugger: 
-->
<template>
    <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
        <slot />
    </a>
    <router-link v-else :to="to">
        <slot />
    </router-link>
</template>

<script lang="ts">
import { Component, prop, Vue } from 'vue-pandora-decorators';
import { isExternal } from '@/utils/validate';

export class Props {

    public to!: string;

    constructor() {
        this.to = prop({ type: String, required: true });
    }
}

@Component({
    name: 'SidebarItemLink',
})
export default class extends Vue.with(Props) {
    public get isExternal() {
        return isExternal;
    }
}
</script>
