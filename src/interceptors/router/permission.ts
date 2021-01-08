import router, { resetRouter } from '@/router';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { isFunction, map } from 'lodash';
import { Permission } from '@/store/modules';
import { message } from 'ant-design-vue';

export enum PermissionErrorType {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
    DONE = 'done',
}

export class PermissionController {
    constructor(
        private to: RouteLocationNormalized,
        private from: RouteLocationNormalized,
        private next: NavigationGuardNext = () => { },
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
        if (true === await Permission.isLogin()) {
            try {
                if (Permission.roles.length === 0) {
                    await Permission.getRoles();
                    const roles = Permission.roles;
                    Permission.generateRoutes(roles);
                    resetRouter();
                    map(Permission.dynamicRoutes, (r) => router.addRoute(r));
                    router.replace({ path: this.to.fullPath, query: this.to.query || {}, replace: true });
                    return await PermissionErrorType.DONE;
                } else {
                    return await PermissionErrorType.SUCCESS;
                }
            } catch (err) {
                // Remove token and redirect to login page
                Permission.resetToken('');
                message.error(err || '权限验证出错 .');
                return PermissionErrorType.ERROR;
            }
        } else {
            // TODO 这里需要添加登录逻辑
            Permission.resetToken('test');
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
}
