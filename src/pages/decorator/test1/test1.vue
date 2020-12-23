<!--
 * @FilePath: /vue3-template/src/pages/decorator/test1/test1.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:04:46
 * @debugger: 
-->
<template>
    <div>Test1 ...</div>
    <div>{{ count }}</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component({ name: 'decorator-test1' })
export default class extends Vue {
    public count: number;
    constructor() {
        super(arguments);
        this.count = 111;
        setInterval(() => {
            this.count++;
        }, 1000);
    }
}
</script>
