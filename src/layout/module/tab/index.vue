<template>
    <div id="tab" :class="[tabType]">
        <a-tabs
            hide-add
            v-model:activeKey="activeKey"
            type="editable-card"
            @edit="onEdit"
            @change="callback"
            class="tab"
        >
            <a-tab-pane
                v-for="pane in panes"
                :key="pane.path"
                :tab="pane.title"
                :closable="pane.closable"
            ></a-tab-pane>
        </a-tabs>
        <a-dropdown class="tab-tool" :placement="placement">
            <a-button>
                <template v-slot:icon>
                    <DownOutlined />
                </template>
            </a-button>
            <template v-slot:overlay>
                <a-menu>
                    <a-menu-item>
                        <a @click="closeAll()">关 闭 所 有</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a @click="closeOther()">关 闭 其 他</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a @click="closeCurrent()">关 闭 当 前</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>
<script lang="ts">
import _path from 'path';
import { computed, watch } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { RouteRecordRaw } from 'vue-router';
import config from '@/config/theme.config';
import { Component, Vue } from 'vue-pandora-decorators';
import { Layout, Permission } from '@/store/modules';

@Component({
    components: {
        DownOutlined,
    } as any,
})
export default class extends Vue {

    public get defaultPanes() {
        return Layout.panes;
    }

    public get storeKey() {
        return Layout.activeKey;
    }

    public get tabType() {
        return Layout.tabType;
    }

    public get selectTab() {
        return Layout.selectTab;
    }

    public get removeTab() {
        return Layout.removeTab;
    }

    public get closeAllTab() {
        return Layout.closeAllTab;
    }

    public get closeOtherTab() {
        return Layout.closeOtherTab;
    }

    public get closeCurrentTab() {
        return Layout.closeCurrentTab;
    }

    public get panes(): any[] {
        return Layout.panes;
    }

    public initPanes: RouteRecordRaw[];
    public activeKey: string;
    public state: { menu: RouteRecordRaw[]; };
    public placement: string;

    constructor() {
        super(arguments);
        this.initPanes = [];
        this.activeKey = Layout.activeKey;
        this.state = { menu: Permission.dynamicRoutes };
        this.placement = 'bottomRight';
    }

    public created() {
        this.findFixedPane(this.initPanes, '', Permission.dynamicRoutes);
        watch(computed(() => this.$route.fullPath), this.dynamicMenu.bind(this));
        watch(computed(() => this.storeKey), (targetKey: string) => {
            this.activeKey = targetKey;
            this.$router.push(targetKey);
        });

        this.dynamicMenu();

        // 合并并去重vuex中的初始值
        const allTabs = [...(this.initPanes || []), ...(this.defaultPanes || [])];
        const tabs = allTabs.reduce((result: any, current: any) => {
            const resultTitles = result.map((it: any) => it.title)
            if (!resultTitles.includes(current.title)) {
                return [...result, current]
            } else {
                return result
            }
        }, []);
        Layout.initPanes(tabs);
    }

    public findFixedPane(list: RouteRecordRaw[], prefix: string, panes: RouteRecordRaw[]) {
        panes.forEach((pane) => {
            const { path, meta, children = [] } = pane;
            const hidden = (meta || {}).hidden;
            if (children && children.length > 0) {
                this.findFixedPane(list, _path.resolve(prefix, path), children);
            } else {
                // if (!hidden && meta && meta.fixed) {
                const currentName = this.$route.name;
                if (!hidden && meta && config.defaultTab === pane.name) {
                    list.push({
                        title: meta.title,
                        name: currentName, noCache: meta.noCache || false,
                        path: _path.resolve(prefix, path),
                        closable: !(currentName === pane.name),
                    } as any);
                }
            }
        });
    }

    public dynamicMenu() {
        const title = (this.$route.meta || {}).title;
        const noCache = (this.$route.meta || {}).noCache || false;
        const path = this.$route.path;
        const name = this.$route.name;
        Layout.addTab({ title, path, name, noCache } as any);
    }

    public callback(key: string) {
        this.selectTab(key);
    }

    public closeAll() {
        this.closeAllTab();
    }

    public closeOther() {
        this.closeOtherTab();
    }

    public closeCurrent() {
        this.closeCurrentTab();
    }

    public remove(targetKey: any) {
        this.removeTab(targetKey);
    }

    public onEdit(targetKey: string, action: string | number) {
        (this as any)[action](targetKey);
    }
}
</script>
