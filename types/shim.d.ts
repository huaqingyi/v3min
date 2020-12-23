/*
 * @FilePath: /vue3-template/src/shim.d.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-14 15:08:45
 * @debugger: 
 */
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: any & DefineComponent;
    export default component;
}
