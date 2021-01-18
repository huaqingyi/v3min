<template>
    <section>
        <div>Project ...</div>
        <comp-var :component="component" />
        <div>Project ...</div>
    </section>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { Component, Vue } from 'vue-pandora-decorators';
import Axios from 'axios';

@Component
export default class extends Vue {

    public get component() {
        return defineAsyncComponent(async () => {
            const http = Axios.create({});
            return http.get('http://localhost:8082/_oss_component/test1/index.js', {}).then(({ data }) => {
                const pack = eval(data);
                return pack.Test1;
            });
            // const component = await import('./test.vue');
            // console.log(component);
            // return component;
        });
    }

    constructor() {
        super(arguments);
    }
}
</script>
