<!--
 * @FilePath: /vue3-template/src/pages/home/home.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-22 15:43:21
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:24:12
 * @debugger: 
-->
<template>
    <div>home ...</div>
    <div>username: {{ username }}</div>
    <div>password: {{ password }}</div>
    <!-- <div>{{ updateds }}</div> -->
    <el-button @click="editTestUser({ username: 'test', password: 'pwd' })">修改</el-button>
</template>
<script lang="ts">
import { Component, useAction, useState, Vue } from 'vue-pandora-decorators';
import { Home, HomeState } from './store';

@Component({ name: 'home-index' })
export default class extends Vue {
    public get username() {
        return useState<HomeState>(Home).username;
    }

    public get password() {
        return useState<HomeState>(Home).password;
    }

    public get editUser() {
        return useAction(Home).setTest;
    }

    // public updateds: number;

    constructor() {
        super(arguments);
        // this.updateds = (new Date).getTime();
    }

    public async editTestUser(data: any) {
        console.log(this.editUser, this.username);
        const res = await this.editUser(data);
        console.log(res);
    }
}
</script>