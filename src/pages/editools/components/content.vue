<template>
    <!-- <div id="tools-container">
        <div class="tools-container">
            
        </div>
    </div>-->
    <Vue3DraggableResizable
        v-for="(dragger, idx) in draggerables"
        :key="idx"
        :x="dragger.y - dragger.width"
        :y="dragger.x - dragger.height"
    >
        <img
            :width="dragger.width"
            :height="dragger.height"
            :src="require(`@/libs/${dragger.component}/cover.png`)"
        />
    </Vue3DraggableResizable>
</template>
<script lang="ts">
import { map } from 'lodash';
import { Component, useState, Vue } from 'vue-pandora-decorators';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import { EditoolStore, IEditoolState } from '../store';

@Component({
    components: { Vue3DraggableResizable },
})
export default class extends Vue {

    public get draggerables() {
        return map(useState<IEditoolState>(EditoolStore).draggerables, d => d);
    }

    public mounted() {
        console.log(this.draggerables);
    }
}
</script>
<style lang="scss">
// #tools-container {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     .tools-container {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         border: 1px solid #000;
//         user-select: none;
//     }
// }
</style>
