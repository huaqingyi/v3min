import { VuexModule, Module, Mutation, Action, getModule, MutationAction } from 'vue-pandora-decorators';
import config from '@/config/theme.config';
import store from '@/store';
import { isBoolean } from 'lodash';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

export interface ILayoutState {
    /**
     * 布局方式（整体界面的排版方式）
     * layout-side -- 侧边布局
     * layout-head -- 顶部菜单
     * layout-comp 联动布局
     */
    layout: string;
    /**
     * 系统主题（整体色调）
     * light -- 白色主题
     * dark -- 暗色主题
     * night -- 夜间主题
     */
    theme: string;
    /**
     * 主题颜色(主题颜色)
     * blue
     * green
     */
    color: string;
    /**
     * 侧边状态
     * true  --  隐藏
     * false --  展开
     */
    collapsed: boolean;
    /**
     * 菜单头部
     * true  --  隐藏
     * false --  展开
     */
    logo: boolean;
    /**
     * 是否开启多标签页
     * true  --  隐藏
     * false --  展开
     */
    tab: boolean;
    /**
     * 多标签页样式
     * card-tab
     * dot-tab
     */
    tabType: string;
    /**
     * 侧边菜单栏宽度
     * 单位:px
     */
    sideWitch: number;
    /**
     * 固定头部
     * true
     * false
     */
    fixedHeader: boolean;
    /**
     * 固定侧边
     * true
     * false
     */
    fixedSide: boolean;
    /**
     * 路由动画
     * fadeRight
     * fadeTop
     */
    routerAnimate: string;
    /**
     * 配色列表
     */
    colorList: string[];
    /**
     * 主题面板状态
     * true
     * false
     */
    setting: { opened: boolean };

    // 选项卡内容存储
    panes: RouteRecordRaw[];
    // 当前激活选项卡
    activeKey: string;
    // 当前打开菜单
    openKey: string[];
    // 手风琴配置
    muiltOpen: boolean;
    // 路由刷新辅助变量
    routerActive: boolean;
    // 浏览器全屏
    fullscreen: boolean;
    // 路由列表
    routes: RouteLocationNormalized[];
}

@Module({ dynamic: true, store, name: 'layout' })
class LayoutStore extends VuexModule implements ILayoutState {
    public layout: string;
    public theme: string;
    public color: string;
    public collapsed: boolean;
    public logo: boolean;
    public tab: boolean;
    public tabType: string;
    public sideWitch: number;
    public fixedHeader: boolean;
    public fixedSide: boolean;
    public routerAnimate: string;
    public colorList: string[];
    public setting: { opened: boolean; };
    public panes: RouteRecordRaw[];
    public activeKey: string;
    public openKey: string[];
    public muiltOpen: boolean;
    public routerActive: boolean;
    public fullscreen: boolean;
    public routes: any[];

    constructor(module: LayoutStore) {
        super(module);
        this.layout = localStorage.getItem('layout') || config.layout || 'layout-side';
        this.theme = localStorage.getItem('theme') || config.theme || 'theme-dark';
        this.color = localStorage.getItem('color') || config.color || 'theme-green';
        this.collapsed = Boolean(localStorage.getItem('collapsed') || config.collapsed);
        this.logo = Boolean(localStorage.getItem('logo') || (isBoolean(config.logo) ? true : false));
        this.tab = Boolean(localStorage.getItem('tab') || (isBoolean(config.tab) ? true : false));
        this.tabType = localStorage.getItem('tabType') || config.tabType || 'dot-tab';
        this.sideWitch = config.sideWidth || 250;
        this.fixedHeader = Boolean(localStorage.getItem('fixedHeader') || (isBoolean(config.fixedHeader) ? true : false));
        this.fixedSide = Boolean(localStorage.getItem('fixedSide') || (isBoolean(config.fixedSide) ? true : false));
        this.routerAnimate = localStorage.getItem("routerAnimate") || config.routerAnimate || 'null';
        this.colorList = config.colorList;
        this.setting = { opened: false };
        this.panes = sessionStorage.getItem('tabs') ? JSON.parse(
            sessionStorage.getItem('tabs') || JSON.stringify([])
        ) : [];
        this.activeKey = '';
        this.openKey = [];
        this.muiltOpen = true;
        this.routerActive = true;
        this.fullscreen = false;
        this.routes = [];
    }

    @Action
    public updateRouterActive() {
        this.updateRouterActiveChange();
    }

    @Mutation
    private updateRouterActiveChange() {
        this.routerActive = !this.routerActive;
    }

    @Action
    public toggleSidebar() {
        this.toggleSidebarChange();
    }

    @Mutation
    private toggleSidebarChange() {
        if (this.collapsed) {
            this.sideWitch = 250;
            this.openKey = JSON.parse(localStorage.getItem('openKeys') || JSON.stringify([]));
        } else {
            this.sideWitch = 80;
            localStorage.setItem('openKeys', JSON.stringify(this.openKey));
            this.openKey = [];
        }
        this.collapsed = !this.collapsed;
    }

    @Action
    public toggleSetting() {
        this.toggleSettingChange();
    }

    @Mutation
    private toggleSettingChange() {
        this.setting.opened = !this.setting.opened;
    }

    @Action
    public updateFullscreen() {
        this.updateFullscreenChange();
    }

    @Mutation
    private updateFullscreenChange() {
        this.fullscreen = !this.fullscreen;
    }

    @Action
    public updateOpenKey(data: { openKeys: string[] }) {
        this.updateOpenKeyChange(data);
    }

    @Mutation
    private updateOpenKeyChange({ openKeys }: { openKeys: string[] }) {
        //手风琴模式, 只保留当前打开的节点
        let length = openKeys.length;
        if (length > 0 && this.muiltOpen) {
            //除了最后打开的节点, 其他的节点可能包含父节点
            let otherKeys = openKeys.slice(0, length - 1);
            //最后一次打开的节点
            let lastKey = openKeys[length - 1];
            this.openKey = [...otherKeys.filter(ok => lastKey.startsWith(ok)), lastKey];
        } else {
            this.openKey = openKeys;
        }
    }

    @Action
    public clearOpenKey() {
        this.clearOpenKeyChange();
    }

    @Mutation
    private clearOpenKeyChange() {
        this.openKey = [];
    }

    @Action
    public updateLayout(layout: string) {
        this.updateLayoutChange(layout);
    }

    @Mutation
    private updateLayoutChange(layout: string) {
        this.layout = layout;
    }

    @Action
    public updateTheme(theme: string) {
        this.updateThemeChange(theme);
    }

    @Mutation
    private updateThemeChange(theme: string) {
        this.theme = theme;
    }

    @Action
    public updateRouterAnimate(routerAnimate: string) {
        this.updateRouterAnimateChange(routerAnimate);
    }

    @Mutation
    private updateRouterAnimateChange(routerAnimate: string) {
        this.routerAnimate = routerAnimate;
    }

    @Action
    public updateColor(color: string) {
        this.updateColorChange(color);
    }

    @Mutation
    private updateColorChange(color: string) {
        this.color = color;
    }

    @Action
    public updateTabType(tabType: string) {
        this.updateTabTypeChange(tabType);
    }

    @Mutation
    private updateTabTypeChange(tabType: string) {
        this.tabType = tabType;
    }

    @Action
    public toggleLogo() {
        this.toggleLogoChange();
    }

    @Mutation
    private toggleLogoChange() {
        this.logo = !this.logo;
    }

    @Action
    public updateTab() {
        this.updateTabChange();
    }

    @Mutation
    private updateTabChange() {
        this.tab = !this.tab;
    }

    @Action
    public toggleFixedSize() {
        this.toggleFixedSizeChange();
    }

    @Mutation
    private toggleFixedSizeChange() {
        this.fixedSide = !this.fixedSide;
    }

    @Action
    public toggleFixedHeader() {
        this.toggleFixedHeaderChange();
    }

    @Mutation
    private toggleFixedHeaderChange() {
        this.fixedHeader = !this.fixedHeader;
    }

    @Action
    public addTab(value: RouteRecordRaw) {
        this.addTabChange(value);
    }

    @Mutation
    private addTabChange(value: RouteRecordRaw) {
        // 遍历当前的选项卡中是否已存在新增的 Key
        if (this.panes.findIndex(pane => pane.path === value.path) === -1) {
            // 如果不存在新增选项卡
            this.panes.push(value)
            sessionStorage.setItem('tabs', JSON.stringify(this.panes))
        }
        this.activeKey = value.path;
    }

    @Action
    public initPanes(panes: RouteRecordRaw[]) {
        this.initPanesChange(panes);
    }

    @Mutation
    private initPanesChange(panes: RouteRecordRaw[]) {
        this.panes = panes;
    }

    @Action
    public selectTab(key: string) {
        this.selectTabChange(key);
    }

    @Mutation
    private selectTabChange(key: string) {
        this.activeKey = key;
    }

    @Action
    public removeTab(targetKey: string) {
        this.removeTabChange(targetKey);
    }

    @Mutation
    private removeTabChange(targetKey: string) {
        //当前激活的选项卡, 选项卡列表
        let { activeKey, panes } = this;
        //从选项卡列表移除当前选项卡
        let index = panes.findIndex(pane => pane.path === targetKey);
        panes.splice(index, 1);
        this.panes = panes;
        sessionStorage.setItem('tabs', JSON.stringify(panes))
        //更换已经选中的菜单
        if (activeKey === targetKey) {
            let lastPane = panes[panes.length - 1];
            this.activeKey = lastPane ? lastPane.path : '';
        }
    }

    @Action
    public closeAllTab(keepKeys: string[] = []) {
        this.closeAllTabChange(keepKeys);
    }

    @Mutation
    private closeAllTabChange(keepKeys: string[]) {
        //当前激活的选项卡, 选项卡列表
        let { activeKey, panes } = this;
        //保留不能关闭的选项卡
        panes = panes.filter((pane) => (pane as any).closable === false || keepKeys.includes(pane.path))
        this.panes = panes;
        sessionStorage.setItem('tabs', JSON.stringify(panes))
        //检查当前选中的是否被关闭
        if (panes.findIndex(pane => pane.path === activeKey) === -1) {
            let lastPane = panes[panes.length - 1];
            this.activeKey = lastPane ? lastPane.path : '';
        }
    }

    @Action
    public closeOtherTab() {
        this.closeOtherTabChange();
    }

    @Mutation
    private closeOtherTabChange() {
        const keepKeys = [this.activeKey];
        //当前激活的选项卡, 选项卡列表
        let { activeKey, panes } = this;
        //保留不能关闭的选项卡
        panes = panes.filter((pane) => (pane as any).closable === false || keepKeys.includes(pane.path))
        this.panes = panes;
        sessionStorage.setItem('tabs', JSON.stringify(panes))
        //检查当前选中的是否被关闭
        if (panes.findIndex(pane => pane.path === activeKey) === -1) {
            let lastPane = panes[panes.length - 1];
            this.activeKey = lastPane ? lastPane.path : '';
        }
    }

    @Action
    public closeCurrentTab() {
        this.closeCurrentTabChange();
    }

    @Mutation
    private closeCurrentTabChange() {
        const targetKey = this.activeKey;
        //当前激活的选项卡, 选项卡列表
        let { activeKey, panes } = this;
        //从选项卡列表移除当前选项卡
        let index = panes.findIndex(pane => pane.path === targetKey);
        panes.splice(index, 1);
        this.panes = panes;
        sessionStorage.setItem('tabs', JSON.stringify(panes))
        //更换已经选中的菜单
        if (activeKey === targetKey) {
            let lastPane = panes[panes.length - 1];
            this.activeKey = lastPane ? lastPane.path : '';
        }
    }

    // @Action
    // public setToggleFixedSide() {
    //     this.toggleFixedSide();
    // }

    // @Mutation
    // private toggleFixedSide() {
    //     this.fixedSide = !this.fixedSide;
    // }

    // @Action
    // public setToggleFixedHeader() {
    //     this.toggleFixedHeader();
    // }

    // @Mutation
    // private toggleFixedHeader() {
    //     this.fixedHeader = !this.fixedHeader;
    // }
}

export const Layout = getModule(LayoutStore);