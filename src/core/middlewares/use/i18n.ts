import { App } from 'vue';
import config from '@/config/locale';
import type { I18nOptions } from 'vue-i18n';
import { messages, getLocale, setI18n } from '@/locales';
import { createI18n, I18n } from 'vue-i18n';

const localeData: I18nOptions = {
    legacy: false,
    locale: getLocale(),
    fallbackLocale: config.fallback,
    messages: messages,
    availableLocales: config.availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: true,
    silentFallbackWarn: true,
    fallbackWarn: true,
};

const i18n = createI18n(localeData) as I18n;
setI18n(i18n);

export async function i18ns(app: App) {
    app.use(i18n);
    return app;
}