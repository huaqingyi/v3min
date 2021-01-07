<template>
    <div>
        <div>Tables ...</div>
        <div>{{ count }}</div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component
export default class extends Vue {
    public count: number;

    constructor() {
        super(arguments);
        this.count = 0;
    }

    public created() {
        this.addCount();
    }

    public async addCount() {
        ++this.count;
        await new Promise(r => setTimeout(r, 500));
        this.addCount();
    }
}
</script>
<style lang="scss">
</style>
