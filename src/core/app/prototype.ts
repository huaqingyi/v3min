/*
 * @FilePath: /vue3-template/src/core/app/prototype.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 11:02:57
 * @debugger: 
 */
import { app } from '../core';
import Axios from 'axios';
import http from '@/config/http';
import { Service } from 'vue-pandora-decorators';

/**
 * 纯净的 http 服务
 */
app.config.globalProperties.$axios = Axios;

/**
 * 初始化后的 http 服务
 */
const $http = Axios.create(http);
app.config.globalProperties.$http = $http;
Service.prototype.http = $http;
