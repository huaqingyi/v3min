<template>
    <DraggableContainer>
        <section class="container">
            <section class="left-container">
                <LeftContainer />
            </section>
            <section class="content-container">
                <Content />
            </section>
            <section class="right-container">
                <RightContainer />
            </section>
        </section>
    </DraggableContainer>
</template>
<script lang="ts">
import { Component, useAction, useState, Vue } from 'vue-pandora-decorators';
import LeftContainer from './components/left.vue';
import Content from './components/content.vue';
import RightContainer from './components/right/index.vue';
import { EditoolStore, IEditoolState } from './store';
import { ComponentsType } from './service';
import { DraggableContainer } from 'vue3-draggable-resizable';

@Component({
    components: {
        LeftContainer, RightContainer, Content,
        DraggableContainer,
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
.container {
    height: 100%;
    display: flex;
    .left-container,
    .right-container {
        flex: 1;
    }
    .content-container {
        width: 65%;
    }
}
</style>
