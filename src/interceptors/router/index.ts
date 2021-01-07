import { App } from 'vue';
import router from '@/router';
import { PermissionController } from './permission';
import { ProgressController } from './progress';

export function routerInterceptor(app: App) {
    router.beforeEach((to, from, next) => {
        const progress = new ProgressController(to, from, next);
        progress.start();

        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

        const permission = new PermissionController(to, from, next);
        permission.auth();
    });

    router.afterEach((to, from) => {
        const progress = new ProgressController(to, from);
        progress.done();
    })
    return app;
}
