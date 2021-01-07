<template>
    <a-card class="page-header">
        <p class="page-header-title">{{ title }}</p>
        <p class="page-header-describe">{{ describe }}</p>
    </a-card>
</template>
<script lang="ts">
import { Component, prop, Vue } from 'vue-pandora-decorators';

export class Props {
    public title: string;
    public describe: string;

    constructor() {
        this.title = prop({ type: String, required: true });
        this.describe = prop({ type: String, required: true });
    }
}

@Component({ name: 'page-header' })
export default class extends Vue.with(Props) {
};
</script>
<style scoped>
.page-header {
    border-radius: 0px !important;
}
.page-header-title {
    font-size: 20px;
    font-weight: 500;
}
.page-header-describe {
    font-size: 14px;
}
</style>