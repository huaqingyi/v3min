/*
 * @FilePath: /vue3-template/src/core/app/use.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 18:30:58
 * @debugger: 
 */
import { app } from '../core';
import { router } from '@/rotuer';
import store from '@/store';
import ElementPlus from 'element-plus';

app.use(router);
app.use(store);
app.use(ElementPlus);
