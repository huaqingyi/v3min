import messages from './lang';
import config from '@/config/locale';
import { LocaleType } from './types';
import { I18n } from 'vue-i18n';

export function getLanguage(): LocaleType | undefined {
    return localStorage.getItem('language') as any;
};

export const getLocale = () => {
    const cookieLanguage = getLanguage();
    if (cookieLanguage) { return cookieLanguage; }

    const language = navigator.language.toLowerCase();
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }

    return config.lang;
}

export { messages };

let i18n: I18n;

export function setI18n(useI18n: I18n) {
    console.log(1111, useI18n)
    i18n = useI18n;
}

export function getI18n() {
    console.log(222, i18n)
    return i18n;
}

export function t(languageKey: string) {
    getI18n();
    // return getI18n().global.t(languageKey);
    return languageKey;
}
