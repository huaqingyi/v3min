<template>
    <a-collapse class="root" v-model:activeKey="activeKey" :bordered="false">
        <a-collapse-panel v-for="data in componentypes" :key="data.type" :header="data.name">
            <div class="component-grid">
                <div
                    v-for="(component,idx) in components.data"
                    :key="`${data.type}-${idx}`"
                    class="component-grid-item"
                >
                    <!-- <Vue3DraggableResizable initW="100%"></Vue3DraggableResizable> -->
                    <img class="grid-img" :src="require(`@/libs/${component}/cover.png`)" />
                    <div class="grid-text">{{ component }}</div>
                </div>
            </div>
        </a-collapse-panel>
    </a-collapse>
</template>
<script lang="ts">
import { map } from 'lodash';
import { Component, useState, Vue } from 'vue-pandora-decorators';
import { ComponentsType } from '../../service';
import { EditoolStore, IEditoolState } from '../../store';
import Vue3DraggableResizable from 'vue3-draggable-resizable';

@Component({
    components: {
        Vue3DraggableResizable,
    },
})
export default class extends Vue {

    public get componentypes() {
        return map(ComponentsType, type => {
            let name: string = '';
            switch (type) {
                case ComponentsType.BUILTIN:
                default:
                    name = '内置组件';
                    break;
            }
            return {
                type, name,
            };
        });
    }

    public get components() {
        return useState<IEditoolState>(EditoolStore).components;
    }

    public activeKey: string[];

    constructor() {
        super(arguments);
        this.activeKey = [ComponentsType.BUILTIN];
    }
}
</script>
<style lang="scss">
.root {
    .component-grid {
        display: flex;
        .component-grid-item {
            position: relative;
            flex: 25%;
            width: 25%;
            padding: 0.35rem;

            .grid-img {
                width: 100%;
            }
            .grid-text {
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>
