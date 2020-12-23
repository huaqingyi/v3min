<!--
 * @FilePath: /vue3-template/src/pages/decorator/test2/test2.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:04:31
 * @debugger: 
-->
<template>
    <div>Test2 ...</div>
    <div>{{ count }}</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component({ name: 'decorator-test2' })
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
