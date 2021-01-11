<template>
    <section class="container">
        <section class="left-container">
            <LeftContainer />
        </section>
        <section class="dragger">
            <DraggableContainer>
                <section class="dragger-content">
                    <section class="content-container">
                        <Content />
                    </section>
                    <section class="right-container">
                        <RightContainer />
                    </section>
                </section>
            </DraggableContainer>
        </section>
    </section>
</template>
<script lang="ts">
import { Component, useAction, useState, Vue } from 'vue-pandora-decorators';
import LeftContainer from './components/left.vue';
import Content from './components/content.vue';
import RightContainer from './components/right/index.vue';
import { EditoolStore, IEditoolState } from './store';
import { ComponentsType } from './service';
import { DraggableContainer } from 'vue3-draggable-resizable';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

@Component({
    components: {
        LeftContainer, RightContainer, Content,
        DraggableContainer, Vue3DraggableResizable,
    },
})
export default class extends Vue {

    public get components() {
        return useState<IEditoolState>(EditoolStore).components;
    }

    public get getComponents() {
        return useAction(EditoolStore).getComponents;
    }

    constructor() {
        super(arguments);
    }

    public async created() {
        await this.getComponents({ type: ComponentsType.BUILTIN });
        console.log(this.components);
    }
}
</script>
<style lang="scss">
.parent {
    width: 100%;
    height: 100%;
    border: 1px solid #000;
    user-select: none;
    .container {
        display: flex;
        .content {
            flex: 1;
        }
        .edit {
            position: relative;
            width: 25%;
        }
    }
}
.container {
    height: 100%;
    display: flex;
    .left-container {
        flex: 1;
    }
    .dragger {
        display: flex;
        flex: 80%;
        .dragger-content {
            display: flex;
            width: 100%;
            height: 100%;
            .content-container {
                flex: 1;
            }
            .right-container {
                width: 25%;
            }
        }
    }
}
</style>
