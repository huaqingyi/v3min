<template>
    <div>
        <div>tableData: {{ tableData }}</div>
        <div>datatime: {{ datatime }}</div>
        <a-button @click="test({ page: 1, pageCount: 20 })">测试</a-button>
    </div>
</template>
<script lang="ts">
import { Component, useAction, useState, Vue } from 'vue-pandora-decorators';
import { DashboardStore, IDashboardState } from './store';

@Component
export default class extends Vue {

    public get tableData() {
        return useState<IDashboardState>(DashboardStore).tableData;
    }

    public get datatime() {
        return useState<IDashboardState>(DashboardStore).datatime;
    }

    public get test() {
        return useAction(DashboardStore).test;
    }
}
</script>
<style lang="scss">
</style>
