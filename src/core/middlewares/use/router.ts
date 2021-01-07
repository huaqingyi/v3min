import { App } from 'vue';
import router from '@/router';

export function routers(app: App) {
    return app.use(router);
}