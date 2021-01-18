import { VuexModule, Module, Action, Mutation, getModule } from 'vue-pandora-decorators';
import { RouteRecordRaw } from 'vue-router';
import { PermissionService } from '../service/permission.service';
import asyncRoutes from '@/layout/router';
import store from '@/store';
import { routes as constantRoutes } from '@/router';

export interface IPermissionState {
    roles: string[];
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    // TODO: 这里为权限过滤逻辑
    // if (route.meta && route.meta.roles) {
    //     return roles.some(role => (route.meta || {}).roles.includes(role));
    // } else {
    //     return true;
    // }
    return true;
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[], prefiex: string = '/') => {
    // TODO: 这里为权限过滤逻辑
    const res: RouteRecordRaw[] = [];
    routes.forEach(route => {
        const r = { ...route };
        if (!r.name) r.name = Symbol(`${prefiex}${r.path}`).toString();
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles, r.path);
            }
            res.push(r);
            if (r.children && r.children.length === 0 && !r.redirect) {
                res.pop();
            }
        }
    });
    return res;
}

@Module({ dynamic: true, store, name: 'permission' })
class PermissionStore extends VuexModule implements IPermissionState {
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
        return sessionStorage.getItem('sessiontoken') ? true : false;
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
        if (token) { sessionStorage.setItem('sessiontoken', token); }
    }

    @Action
    public setRemoveToken() {
        this.removeToken();
    }

    @Mutation
    private removeToken() {
        sessionStorage.removeItem('sessiontoken');
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

export const Permission = getModule(PermissionStore);

