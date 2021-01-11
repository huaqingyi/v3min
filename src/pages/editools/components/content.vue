<template>
    <div id="tools-container">
        <div class="tools-container">
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';

@Component
export default class extends Vue {
}
</script>
<style lang="scss">
#tools-container {
    position: relative;
    width: 100%;
    height: 100%;
    .tools-container {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid #000;
        user-select: none;
    }
}
</style>
