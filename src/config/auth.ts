/*
 * @FilePath: /vue3-template/src/config/auth.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-15 10:14:15
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-15 16:14:51
 * @debugger: 
 */

import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { resetRouter, router } from '../rotuer';
import routers from '@/layout/router';
import { PermissionModule } from '../store/modules/permission';
import { ElMessage } from 'element-plus';
import { isFunction } from 'lodash';

export enum PermissionErrorType {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
    DONE = 'done',
}

export class Auth {
    constructor(
        private to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        private next: NavigationGuardNext,
    ) { }

    public async auth() {
        const permission = await this.actionPermission();
        switch (permission) {
            case PermissionErrorType.SUCCESS:
                if (this.restPermission && isFunction(this.restPermission))
                    return this.restPermission();
                else return this.next();
            case PermissionErrorType.FAIL:
                if (this.notPermission && isFunction(this.notPermission))
                    return this.notPermission();
                else return this.next(`/401`);
            case PermissionErrorType.ERROR:
                if (this.errorPermission && isFunction(this.errorPermission))
                    return this.errorPermission();
                else return this.next(`/404`);
            case PermissionErrorType.DONE: return await false;
            default: return this.notPermission();
        }
    }

    public async actionPermission(): Promise<PermissionErrorType> {
        if (true === await PermissionModule.isLogin()) {
            try {
                if (PermissionModule.roles.length === 0) {
                    await PermissionModule.getRoles();
                    const roles = PermissionModule.roles;
                    PermissionModule.generateRoutes(roles);
                    resetRouter();
                    // const roles = PermissionModule.roles;
                    routers.map((r) => router.addRoute(r));
                    router.replace({ ...this.to, replace: true });
                    return await PermissionErrorType.DONE;
                } else {
                    return await PermissionErrorType.SUCCESS;
                }
            } catch (err) {
                // Remove token and redirect to login page
                PermissionModule.resetToken('');
                ElMessage.error(err || '权限验证出错 .');
                return PermissionErrorType.ERROR;
            }
        } else {
            // TODO 这里需要添加登录逻辑
            PermissionModule.resetToken('test');
            router.replace({ ...this.to, replace: true });
            return await PermissionErrorType.DONE;
        }
    }

    public async restPermission() {
        await this.next();
        return true;
    }

    public async notPermission() {
        await this.next(`/401`) // 否则全部重定向到登录页
        // await this.next();
    }

    public async errorPermission() {
        await this.next(`/404`) // 否则全部重定向到登录页
        // await this.next();
    }
};
