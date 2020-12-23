/*
 * @FilePath: /vue3-template/src/store/modules/user.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-14 18:47:27
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 10:58:06
 * @debugger: 
 */
import { VuexModule, Module, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface UserInfo {
    id: number;
    userid: string;
    username: string;
    email: string;
    telephone: string;
}

export interface UserState {
    userInfo?: UserInfo;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {

    public userInfo?: UserInfo;

    public get token() {
        return localStorage.getItem('token');
    }

    constructor(props: any) {
        super(props);
        // this.routes = constantRoutes.concat(asyncRoutes);
        // this.dynamicRoutes = asyncRoutes;
    }

    // @Action
    // public generateRoutes(roles: string[]) {
    //     let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     this.UserRoutes(accessedRoutes);
    // }

    // @Mutation
    // private UserRoutes(routes: RouteConfig[]) {
    //     this.routes = constantRoutes.concat(routes);
    //     this.dynamicRoutes = routes;
    // }
}

export const UserModule = getModule(User);