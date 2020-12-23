<!--
 * @FilePath: /vue3-template/src/layout/components/navbar/components/hamburger/index.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 17:36:46
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 18:05:38
 * @debugger: 
-->
<template>
    <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
        <i class="el-icon-s-unfold" width="20" height="20"></i>
    </div>
</template>

<script lang="ts">
import { Component, prop, Vue, WithDefault } from 'vue-pandora-decorators';

export class Props {

    public isActive!: WithDefault<boolean>;

    constructor() {
        this.isActive = prop({ default: false });
    }
}

@Component({
    name: 'Hamburger',
})
export default class extends Vue.with(Props) {
    public toggleClick() {
        this.$emit('toggleClick');
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
    vertical-align: middle;
}

.is-active {
    transform: rotate(180deg);
}
</style>
