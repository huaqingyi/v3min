import { App } from 'vue';
import Components from '@/components';

export async function components(app: App) {
    return app.use(Components);
}