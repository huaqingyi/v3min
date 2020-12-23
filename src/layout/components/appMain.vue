<!--
 * @FilePath: /vue3-template/src/layout/components/appMain.vue
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 18:09:58
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:06:40
 * @debugger: 
-->
<template>
    <section class="app-main">
        <!-- <router-view v-slot="{ Component, route }">
            <transition>
                <keep-alive>
                    <component :is="route.name" />
                </keep-alive>
            </transition>
        </router-view>-->
        <router-view v-slot="{ Component }">
            <keep-alive :include="cachedViews">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-pandora-decorators';
import { TagsViewModule } from '@/store/modules/tagsView';

@Component({
    name: 'AppMain',
})
export default class extends Vue {
    public get cachedViews(): any[] {
        return TagsViewModule.cachedViews;
    }

    public get key() {
        return this.$route.path;
    }
}
</script>

<style lang="scss">
.app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}

.fixed-header + .app-main {
    padding-top: 50px;
    height: 100vh;
    overflow: auto;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }
    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>
