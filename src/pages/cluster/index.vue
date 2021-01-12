<template>
    <section>
        <vxe-table
            border
            show-header-overflow
            show-overflow
            highlight-hover-row
            align="center"
            :data="[]"
        >
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address"></vxe-table-column>
        </vxe-table>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-pandora-decorators";

@Component
export default class extends Vue {

}
</script>
