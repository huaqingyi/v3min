import { App } from 'vue';
import { useI18n } from 'vue-i18n';

export function i18nPrototype(app: App) {
    app.config.globalProperties.$t = (translateKey: string) => {
        try {
            return useI18n().t(translateKey);
        } catch (err) {
            // TODO: translateKey don't in the locales package key .
            return translateKey;
        }
    };
    return app;
}