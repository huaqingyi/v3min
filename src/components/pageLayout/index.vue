<template>
    <div class="page-layout">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component({ name: 'page-layout' })
export default class extends Vue {
}
</script>
<style scoped>
.page-layout {
    margin: 10px;
}
</style>