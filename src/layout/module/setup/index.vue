<template>
    <a-drawer
        placement="right"
        :closable="false"
        :visible="visible"
        width="370"
        :after-visible-change="afterVisibleChange"
        @close="onChangeVisible()"
        :class="[color]"
    >
        <div class="root">
            <div class="one-color">
                <div class="color-title">整体风格</div>
                <div class="color-content">
                    <ul>
                        <li
                            @click="updateTheme('theme-dark')"
                            :class="[theme === 'theme-dark' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                style="border-radius: 4px"
                                class="clearfix full-opacity-hover"
                            >
                                <div>
                                    <span class="color-content-item" />
                                    <span class="color-content-item white" />
                                </div>
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item whitetwo" />
                                </div>
                            </a>
                        </li>
                        <li
                            @click="updateTheme('theme-light')"
                            :class="[theme === 'theme-light' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                class="clearfix full-opacity-hover"
                                style="border-radius: 4px"
                            >
                                <div>
                                    <span class="color-content-item white" />
                                    <span class="color-content-item white" />
                                </div>
                                <div>
                                    <span class="color-content-item white" />
                                    <span class="color-content-item white" />
                                </div>
                            </a>
                        </li>
                        <li
                            @click="updateTheme('theme-night')"
                            :class="[theme === 'theme-night' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                data-skin="skin-blue"
                                style="border-radius: 4px"
                                class="clearfix full-opacity-hover"
                            >
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item blue" />
                                </div>
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item blue" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="one-color">
                <div class="color-title">布局方式</div>
                <div class="color-content">
                    <ul>
                        <li
                            @click="updateLayout('layout-side')"
                            :class="[layout === 'layout-side' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                data-skin="skin-blue"
                                style="border-radius: 4px"
                                class="clearfix full-opacity-hover"
                            >
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item white" />
                                </div>
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item whitetwo" />
                                </div>
                            </a>
                        </li>
                        <li
                            @click="updateLayout('layout-head')"
                            :class="[layout === 'layout-head' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                style="border-radius: 4px"
                                class="clearfix full-opacity-hover"
                            >
                                <div>
                                    <span class="color-content-item blue" />
                                </div>
                                <div>
                                    <span class="color-content-item whitetwo" />
                                </div>
                            </a>
                        </li>
                        <li
                            @click="updateLayout('layout-comp')"
                            :class="[layout === 'layout-comp' ? 'layui-this' : '']"
                        >
                            <a
                                href="javascript:;"
                                data-skin="skin-blue"
                                style="border-radius: 4px"
                                class="clearfix full-opacity-hover"
                            >
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item blue" />
                                </div>
                                <div>
                                    <span class="color-content-item blue" />
                                    <span class="color-content-item whitetwo" />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="select-color">
                <div class="select-color-title">主题配色</div>
                <div class="select-color-content">
                    <span
                        v-for="(colorItem, index) in colorList"
                        class="select-color-item"
                        :key="index"
                        @click="updateColor(colorItem)"
                        :style="colorItem && { 'background-color': colorItem }"
                    >
                        <CheckOutlined v-if="color === colorItem" />
                    </span>
                </div>
            </div>
            <br />
            <div class="one-color">
                <div class="color-title">更多设置</div>
                <div class="color-content">
                    <br />
                    <a-switch :checked="logo" @change="onChangeLogo" />
                    <div class="setting-title-right">菜单头部</div>
                    <br />
                    <br />
                    <a-switch :checked="tab" @change="onChangeTab" />
                    <div class="setting-title-right">多选项卡</div>
                    <br />
                    <br />
                    <a-switch :checked="fixedHeader" @change="onChangeFixedHeader" />
                    <div class="setting-title-right">固定头部</div>
                    <br />
                    <br />
                    <a-switch :checked="fixedSide" @change="onChangeFixedSide" />
                    <div class="setting-title-right">固定侧边</div>
                    <br />
                    <br />
                    <a-select
                        label-in-value
                        v-model:value="tabType"
                        style="width: 100px"
                        @change="handleChange"
                    >
                        <a-select-option value="dot-tab">样式一</a-select-option>
                        <a-select-option value="card-tab">样式二</a-select-option>
                        <a-select-option value="label-tab">样式三</a-select-option>
                    </a-select>
                    <div class="setting-title-right">卡片样式</div>
                    <br />
                    <br />
                    <a-select
                        label-in-value
                        v-model:value="routerAnimate"
                        style="width: 100px"
                        @change="updateRouterAnimate"
                    >
                        <a-select-option value="null">无</a-select-option>
                        <a-select-option value="fade-right">渐入</a-select-option>
                        <a-select-option value="fade-top">上滑</a-select-option>
                    </a-select>
                    <div class="setting-title-right">路由动画</div>
                    <br />
                    <br />
                    <br />
                    <a-button type="primary">复制配置</a-button>&nbsp;&nbsp;
                    <a-button>重置配置</a-button>
                </div>
            </div>
        </div>
        <br />
        <br />
    </a-drawer>
</template>
<script lang="ts">
import { Layout } from '@/store/modules';
import { CheckOutlined } from '@ant-design/icons-vue';
import { Component, Vue } from 'vue-pandora-decorators';

@Component({
    components: {
        CheckOutlined,
    } as any,
})
export default class extends Vue {
    public get visible() {
        return Layout.setting.opened;
    }

    public get logo() {
        return Layout.logo;
    }

    public get tab() {
        return Layout.tab;
    }

    public get theme() {
        return Layout.theme;
    }

    public get fixedSide() {
        return Layout.fixedSide;
    }

    public get fixedHeader() {
        return Layout.fixedHeader;
    }

    public get layout() {
        return Layout.layout;
    }

    public get color() {
        return Layout.color;
    }

    public get colorList(): any[] {
        return Layout.colorList;
    }

    public tabType: { key: string };
    public routerAnimate: { key: string };

    constructor() {
        super(arguments);
        this.tabType = { key: Layout.tabType };
        this.routerAnimate = { key: Layout.routerAnimate };
    }

    // public created() {
    //     this.tabType = Layout.tabType;
    //     this.routerAnimate = Layout.routerAnimate;
    // }

    public updateLayout(layout: string) {
        Layout.updateLayout(layout);
    }

    public updateTheme(theme: string) {
        Layout.updateTheme(theme);
    }

    public updateRouterAnimate(animate: any) {
        Layout.updateRouterAnimate(animate.key);
        // commit("layout/UPDATE_ROUTER_ANIMATE", animate.key);
    }

    public updateColor(color: string) {
        (window as any).less.modifyVars({
            "@primary-color": color,
            "@link-color": color,
            "@btn-primary-bg": color,
        });
        Layout.updateColor(color);
    }

    public handleChange(value: any) {
        Layout.updateTabType(value.key);
    }

    public onChangeVisible() {
        Layout.toggleSetting();
    }

    public onChangeLogo() {
        Layout.toggleLogo();
    }

    public onChangeTab() {
        Layout.updateTab();
    }

    public onChangeTheme() {
        // commit("layout/TOGGLE_THEME")
    }

    public onChangeFixedSide() {
        Layout.toggleFixedSize();
    }

    public onChangeFixedHeader() {
        Layout.toggleFixedHeader();
    }

    public onChangeLayout() {
        // commit("layout/TOGGLE_LAYOUT")
    }

    public afterVisibleChange() {

    }

    public changeLanguage(e: any) {
        // commit("layout/setLanguage", e.target.value);
    }

}
</script>
<style>
.setting-title-right {
    float: right;
    margin-right: 15px;
}
</style>
<style lang="less" scoped>
.root {
    .color-content-item {
        display: block;
        width: 20%;
        float: left;
        height: 12px;
        background: #2e3549;
        border-top-left-radius: 4px;
        &.white {
            background: white;
        }
        &.blue {
            background: #2e3549;
        }
        &.whitetwo {
            background: #f4f5f7;
        }
    }
}
</style>
