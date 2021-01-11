import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import NProgress from 'nprogress';
import { App } from '@/store/modules';
import { $t } from '@/locales';

export enum PermissionErrorType {
    SUCCESS = 'success',
    FAIL = 'fail',
    ERROR = 'error',
    DONE = 'done',
}

export class ProgressController {
    constructor(
        private to: RouteLocationNormalized,
        private from: RouteLocationNormalized,
        private next: NavigationGuardNext = () => { },
    ) { }

    public start() {
        NProgress.start();
        const { meta: { title = '' } } = this.to;
        document.title = $t(title).value;
        App.execCancelToken();
    }

    public done() {
        NProgress.start();
    }
}
