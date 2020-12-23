/*
 * @FilePath: /core-factory/src/main.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-16 10:20:32
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-16 12:40:08
 * @debugger: 
 */
import { app } from './core';

window.onload = () => {
    app.mount('#app');
};
