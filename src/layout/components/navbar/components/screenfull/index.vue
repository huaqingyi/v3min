<!--
 * @FilePath: /vue3-template/src/layout/components/navbar/components/screenfull/index.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 17:37:19
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 18:08:27
 * @debugger: 
-->
<template>
    <div id="screenfull">
        <i :name="isFullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen'" @click="click" />
    </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { Component, Vue } from 'vue-pandora-decorators';
import { ElMessage } from 'element-plus';

const sf = screenfull;

@Component({
    name: 'Screenfull',
})
export default class extends Vue {
    public isFullscreen: boolean;

    constructor() {
        super(arguments);
        this.isFullscreen = false;
    }

    public async mounted() {
        if (sf.isEnabled) {
            sf.on('change', this.change);
        }
    }

    public async beforeDestory() {
        if (sf.isEnabled) {
            sf.off('change', this.change);
        }
    }

    public change() {
        if (sf.isEnabled) {
            this.isFullscreen = sf.isFullscreen;
        }
    }

    public click() {
        if (!sf.isEnabled) {
            ElMessage({
                message: 'you browser can not work',
                type: 'warning',
            });
            return false;
        }
        sf.toggle();
        return true;
    }
}
</script>
