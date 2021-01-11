<template>
    <a-tabs>
        <a-tab-pane key="components">
            <template #tab>
                <span>
                    <apple-outlined />组件
                </span>
            </template>
            <Components />
        </a-tab-pane>
        <a-tab-pane key="attrs">
            <template #tab>
                <span>
                    <android-outlined />属性
                </span>
            </template>
            <Attrs />
        </a-tab-pane>
    </a-tabs>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';
import Components from './components.vue';
import Attrs from './attrs.vue';

@Component({
    components: {
        Components, Attrs,
    }
})
export default class extends Vue {
}
</script>
<style lang="scss">
</style>
