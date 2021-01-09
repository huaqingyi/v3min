import messages from './lang';
import config from '@/config/locale';
import { LocaleType } from './types';
import { I18n } from 'vue-i18n';
import { map } from 'lodash';
import { computed } from 'vue';

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

export function setLanguage(language: LocaleType) {
    localStorage.setItem('language', language);
    (getI18n().global.locale as any).value = getLocale();
}

export { messages };

let i18n: I18n;

export function setI18n(useI18n: I18n) {
    i18n = useI18n;
}

export function getI18n() {
    return i18n;
}

/**
 * for vscode plugin to display the translate packages has key to language value .
 * @param languageKey translate key
 */
export function t(languageKey: string) {
    // return getI18n().global.t(languageKey);
    return languageKey;
}

/**
 * computed ref translate value .
 * @param languageKey translate key
 */
export function $t(languageKey: string) {
    return computed(() => getI18n().global.t(languageKey));
}

export interface LangsType {
    value: LocaleType.en;
    name: string;
}

export function langs(): LangsType[] {
    return map(config.availableLocales, lang => {
        switch (lang) {
            case LocaleType.en: return { value: LocaleType.en, name: t('layout.language.en') };
            case LocaleType.es: return { value: LocaleType.es, name: t('layout.language.es') };
            case LocaleType.jp: return { value: LocaleType.jp, name: t('layout.language.jp') };
            case LocaleType.zh: return { value: LocaleType.zh, name: t('layout.language.zh') };
            default: return {};
        }
    }) as LangsType[];
}
