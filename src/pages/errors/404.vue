<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
            <a-button type="primary">返回首页</a-button>
        </template>
    </a-result>
</template>

<script lang="ts">
import { Component, Vue } from "vue-pandora-decorators";

@Component
export default class extends Vue {

}
</script>
