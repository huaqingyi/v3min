import { App } from 'vue';
import store from '@/store';

export function stores(app: App) {
    return app.use(store);
}
