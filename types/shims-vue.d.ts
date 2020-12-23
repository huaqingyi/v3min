/*
 * @FilePath: /vue3-template/types/shims-vue.d.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 15:22:29
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-14 15:22:41
 * @debugger: 
 */
import 'vue';
import { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: AxiosInstance;
    }
}
