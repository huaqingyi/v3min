<template>
    <div id="tags-view-container" class="tags-view-container">
        <scroll-pane
            v-if="visitedViews && visitedViews.length !== 0 ? true : false"
            :ref="setRefs('scrollPane')"
            class="tags-view-wrapper"
        >
            <template v-for="tag in visitedViews" :key="tag.path">
                <router-link
                    v-if="tag.meta && tag.meta.title"
                    :ref="setRefs('tag')"
                    :to="{
                        path: tag.path,
                        query: tag.query,
                        fullPath: tag.fullPath,
                    }"
                    custom
                    v-slot="{ href, route, navigate }"
                >
                    <span
                        :class="[isActive(tag) ? 'active' : '', 'tags-view-item']"
                        @contextmenu.prevent="openMenu(tag, $event)"
                    >
                        <a :href="href" @click="navigate">{{ (route.meta || {}).title }}</a>
                        <span
                            v-if="!isAffix(tag)"
                            class="el-icon-close"
                            @click="closeSelectedTag(tag)"
                        />
                    </span>
                </router-link>
            </template>
        </scroll-pane>
        <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭当前</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script lang="ts">
import path from 'path';
import { Component, Vue } from 'vue-pandora-decorators';
import { TagsViewModule, ITagView } from '@/store/modules/tagsView';
import { nextTick } from 'vue';
import ScrollPane from './scrollPane.vue';
import asyncRoutes from '@/layout/router';
import { RouterLinkProps } from 'vue-router';

@Component({
    name: 'TagsView',
    components: {
        ScrollPane,
    },
})
export default class extends Vue {
    public visible: boolean;
    public top: number;
    public left: number;
    public selectedTag: ITagView;
    public affixTags: ITagView[];
    public refs: { scrollPane: any; tags: RouterLinkProps[]; }

    public get visitedViews() {
        return TagsViewModule.visitedViews;
    }

    public get routes() {
        return asyncRoutes;
    }

    constructor() {
        super(arguments);
        this.visible = false;
        this.top = 0;
        this.left = 0;
        this.selectedTag = {} as any;
        this.affixTags = [];
        this.refs = { tags: [] } as any;
    }

    public resetRefs() {
        this.refs = { tags: [] } as any;
    }

    public setRefs(name: string) {
        return (el: any) => {
            console.log(1111, name, el);
            switch (name) {
                case 'scrollPane': return this.refs.scrollPane = el;
                case 'tag': return this.refs.tags.push(el);
            }
        };
    }

    public async created() {
        this.$watch('$route', this.onRouteChange.bind(this));
        this.$watch('visible', this.onVisibleChange.bind(this));
    }

    private onRouteChange() {
        this.resetRefs();
        this.addTags();
        this.moveToCurrentTag();
    }

    private onVisibleChange(value: boolean) {
        if (value) {
            document.body.addEventListener('click', this.closeMenu);
        } else {
            document.body.removeEventListener('click', this.closeMenu);
        }
    }

    public async mounted() {
        this.initTags();
        this.addTags();
    }

    public isActive(route: ITagView) {
        return route.path === this.$route.path;
    }

    public isAffix(tag: ITagView) {
        return tag.meta && tag.meta.affix;
    }

    public filterAffixTags(routes: ITagView[], basePath = '/') {
        let tags: ITagView[] = [];
        routes.forEach(route => {
            if (route.meta && route.meta.affix) {
                const tagPath = path.resolve(basePath, route.path || '');
                tags.push({
                    fullPath: tagPath,
                    path: tagPath,
                    name: route.name,
                    meta: { ...route.meta },
                } as any);
            }
            if (route.children) {
                const childTags = this.filterAffixTags(
                    route.children,
                    route.path
                );
                if (childTags.length >= 1) {
                    tags = [...tags, ...childTags];
                }
            }
        });
        return tags;
    }

    public initTags() {
        this.affixTags = this.filterAffixTags(this.routes);
        for (const tag of this.affixTags) {
            // Must have tag name
            if (tag.name) {
                TagsViewModule.addVisitedView(tag);
            }
        }
    }

    public addTags() {
        const { name } = this.$route;
        if (name) {
            TagsViewModule.addView(this.$route);
        }
        return false;
    }

    public moveToCurrentTag() {
        const tags = this.refs.tags; // TODO: better typescript support for router-link
        nextTick(() => {
            for (const tag of tags) {
                if ((tag.to as ITagView).path === this.$route.path) {
                    this.refs.scrollPane.moveToTarget(tag as any);
                    // When query is different then update
                    if (
                        (tag.to as ITagView).fullPath !== this.$route.fullPath
                    ) {
                        TagsViewModule.updateVisitedView(this.$route);
                    }
                    break;
                }
            }
        });
    }

    public refreshSelectedTag(view: ITagView) {
        TagsViewModule.delCachedView(view);
        const { fullPath } = view;
        nextTick(() => {
            this.$router.replace({
                path: '/redirect' + fullPath,
            });
        });
    }

    public closeSelectedTag(view: ITagView) {
        TagsViewModule.delView(view);
        if (this.isActive(view)) {
            this.toLastView(TagsViewModule.visitedViews, view);
        }
        return false;
    }

    public closeOthersTags() {
        this.$router.push(this.selectedTag as any);
        TagsViewModule.delOthersViews(this.selectedTag);
        this.moveToCurrentTag();
    }

    public closeAllTags(view: ITagView) {
        TagsViewModule.delAllViews();
        if (this.affixTags.some(tag => tag.path === this.$route.path)) {
            return;
        }
        this.toLastView(TagsViewModule.visitedViews, view);
    }

    public toLastView(visitedViews: ITagView[], view: ITagView) {
        const latestView: any = visitedViews.slice(-1)[0];
        if (latestView) {
            this.$router.push(latestView);
        } else {
            // Default redirect to the home page if there is no tags-view, adjust it if you want
            if (view.name === 'Dashboard') {
                // to reload home page
                this.$router.replace({ path: '/redirect' + view.fullPath });
            } else {
                this.$router.push('/');
            }
        }
    }

    public openMenu(tag: ITagView, e: MouseEvent) {
        const menuMinWidth = 105;
        const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
        const offsetWidth = (this.$el as HTMLElement).offsetWidth; // container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const left = e.clientX - offsetLeft + 15; // 15: margin right
        if (left > maxLeft) {
            this.left = maxLeft;
        } else {
            this.left = left;
        }
        this.top = e.clientY;
        this.visible = true;
        this.selectedTag = tag;
    }

    public closeMenu() {
        this.visible = false;
    }
}
</script>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;

            &:before {
                transform: scale(0.6);
                display: inline-block;
                vertical-align: -3px;
            }

            &:hover {
                background-color: #b4bccc;
                color: #fff;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;

                &::before {
                    content: "";
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
