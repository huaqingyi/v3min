import { map } from 'lodash';
import { App } from 'vue';
import { i18n } from './i18n';
// export * from './i18n';
// export * from './antd';
// export * from './components';
// export * from './store';
// export * from './router';

export async function use(app: App) {
    await i18n(app);
    const uses = await import('./async.loader');
    await Promise.all(map(uses, async u => await u(app)));
    return app;
}
