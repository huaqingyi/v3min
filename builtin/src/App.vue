<template>
    <h1>Hello Vue 3 + webpack</h1>
    <button @click="inc" class="btn">count {{ count }}</button>
    <AsyncComponent :component="component" />
    <!-- {{ component }} -->
</template>

<script lang="ts">
import {
    ref, reactive, h
} from "vue";
import Axios from 'axios';
import AsyncComponent from './async.component.vue';

export default {
    components: {
        AsyncComponent,
    },
    setup() {
        const count = ref(0);
        const inc = () => {
            count.value++;
        };
        const component = reactive<any>({});
        const http = Axios.create({});
        http.get('http://localhost:8082/_oss_component/test/index.js', {}).then(({ data }) => {
            const pack = eval(data);
            component.value = pack.Test;
        });
        return {
            count,
            component,
            inc,
        };
    },
    mounted() { },
};
</script>

<style scoped>
img {
    width: 200px;
}
h1 {
    font-family: Arial, Helvetica, sans-serif;
}
.btn {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    width: 128px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    color: #fff;
    background: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
</style>