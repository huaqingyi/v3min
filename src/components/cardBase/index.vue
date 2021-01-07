<template>
    <a-card hoverable class="card-base">
        <div :style="{ color: color }" class="card-base-icon">
            <comp-var :component="MenuIcon" />
        </div>
        <div class="card-base-title">{{ title }}</div>
    </a-card>
</template>
<script lang="ts">
import * as Icons from "@ant-design/icons-vue";
import { Component, Vue, prop } from 'vue-pandora-decorators';

export class Props {
    public icon: string;
    public title: string;
    public color: string;
    constructor() {
        this.icon = prop({ type: String, required: true });
        this.title = prop({ type: String, required: true });
        this.color = prop({ type: String, required: true });
    }
}

@Component({ name: 'card-base' })
export default class extends Vue.with(Props) {

    public MenuIcon: any;

    constructor() {
        super(arguments);
        this.MenuIcon = (Icons as any)[this.icon] || {};
    }

    // public get MenuIcon() {
    //     return (Icons as any)[this.icon] || {};
    // }
}
</script>
<style>
.card-base {
    border-radius: 6px;
}
.card-base .ant-card-body {
    padding: 14px;
}
.card-base-icon {
    text-align: center;
    font-size: 30px;
}
.card-base-title {
    text-align: center;
    font-size: 14px;
    margin-top: 6px;
}
</style>