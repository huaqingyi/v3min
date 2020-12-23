/*
 * @FilePath: /vue3-template/src/store/modules/permission.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 14:29:04
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 16:07:37
 * @debugger: 
 */
import { VuexModule, Module, Action, Mutation, getModule } from 'vue-pandora-decorators';
import { RouteRecordRaw } from 'vue-router';
import { PermissionService } from '../service/permission.service';
import asyncRoutes from '@/layout/router';
import { UserModule } from './user';
import store from '@/store';
import { routes as constantRoutes } from '@/rotuer';

export interface PermissionState {
    roles: string[];
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], _roles: string[]) => {
    // TODO: 这里为权限过滤逻辑
    return routes;
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
    public service: PermissionService;
    public roles: string[];

    public routes: RouteRecordRaw[];
    public dynamicRoutes: RouteRecordRaw[];

    constructor(props: any) {
        super(props);
        this.service = new PermissionService();
        this.roles = [];
        this.routes = [];
        this.dynamicRoutes = [];
    }

    @Action
    public generateRoutes(roles: string[]) {
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        this.settingRoutes(accessedRoutes);
    }

    @Mutation
    private settingRoutes(routes: RouteRecordRaw[]) {
        this.routes = constantRoutes.concat(routes);
        this.dynamicRoutes = routes;
    }

    @Action
    public isLogin() {
        return UserModule.token ? true : false;
    }

    @Action
    public async getRoles() {
        // TODO 自己写 API 请调用 Service ...
        const roles = await this.service.getRoles();
        // roles.push('*')
        await this.setRoles(roles);
        return roles;
    }

    @Mutation
    private setRoles(roles: string[]) {
        this.roles = roles;
    }

    @Action
    public resetToken(token?: string) {
        this.removeToken();
        if (token) { localStorage.setItem('token', token); }
    }

    @Mutation
    private removeToken() {
        localStorage.removeItem('token');
    }

    @Action
    public test(roles: string[]) {
        console.log(this);
        return this.setTest(roles);
    }

    @Mutation
    private setTest(roles: string[]) {
        console.log(roles);
        this.roles = roles;
        return roles;
    }

    // @Action
    // public generateRoutes(roles: string[]) {
    //     let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     this.settingRoutes(accessedRoutes);
    // }

    // @Mutation
    // private settingRoutes(routes: RouteConfig[]) {
    //     this.routes = constantRoutes.concat(routes);
    //     this.dynamicRoutes = routes;
    // }
}

export const PermissionModule = getModule(Permission);

