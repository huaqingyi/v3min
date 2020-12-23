<!--
 * @FilePath: /vue3-template/src/pages/redirect/index.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-23 10:47:22
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:23:07
 * @debugger: 
-->
<script lang="ts">
import { isString } from 'lodash';
import { Component, Vue } from 'vue-pandora-decorators';

@Component({ name: 'redirect' })
export default class extends Vue {
    public async created() {
        const { params, query } = this.$route;
        const { path } = params;
        this.$router.replace({ path: '/' + (isString(path) ? [path] : path).join('/'), query });
    }

    render() {
        // Avoid warning for missing template
    }
}
</script>
