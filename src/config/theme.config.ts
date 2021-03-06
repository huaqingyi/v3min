/**
 * project default configuration
 *
 * 项目默认配置信息
 *
 * store 初始化时决定使用 localstore 本地 / theme.config.ts 默认配置
 */
export default {

    /**
     * 参数 : 图标
     */
    image: 'https://gitee.com/pear-admin/Pear-Admin-Layui/raw/master/admin/images/logo.png',

    /**
     * 参数 : 网站名称
     * */
    title: 'Admin',

    /**
     * 参数 : 默认使用的布局
     * layout-side
     * layout-head
     * layout-comp
     * */
    layout:"layout-side",

    /**
     * 参数 : 默认的主题
     * theme-dark
     * theme-light
     * theme-night
     * */
    theme:"theme-dark",

    /**
     * 参数 : 当前菜单的状态
     * true
     * false
     * */
    collapsed: false,

    /**
     * 参数：是否显示菜单头
     * true
     * false
     */
    logo: true,

    /**
     * 参数: 是否开启多标签页
     * true
     * false
     * */
    tab: true,

    /**
     * 参数: 侧边菜单栏宽度
     * 单位: px
     * */
    sideWidth: 250,

    /**
     * 参数: 是否固定侧边
     * true
     * false
     * */
    fixedSide: true,

    /**
     * 参数: 是否固定顶部
     * true
     * false
     */
    fixedHeader: true,

    /**
     * 参数: 选项卡样式
     * card-tab
     * dot-tab
     */
    tabType: "card-tab",

    /**
     * 参数: 主题颜色
     * color - list
     */
    color: "#36b368",

    /**
     * 参数: 可选的主题颜色列表
     * color - key
     */
    colorList: ["#2d8cf0","rgb(255, 184, 0)","rgb(255, 87, 34)","#36b368","black","gray"],

    /**
     * 参数: 路由动画
     * fade-right
     * fade-top
     */
    routerAnimate: "fade-top",

    /**
     * 参数: 通栏 (待实现)
     * true
     * false
     */
    passbar: true,

    /**
     * 参数：默认的tab栏
     */
    defaultTab: 'cluster'

}
