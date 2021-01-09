import { App } from 'vue';
import { useI18n } from 'vue-i18n';

export function i18nPrototype(app: App) {
    app.config.globalProperties.$t = (translateKey: string) => useI18n().t(translateKey);
    return app;
}