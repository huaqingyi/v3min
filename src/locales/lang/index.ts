import { LocaleType } from '../types';
// antd built-in lang
import antdEnLocale from 'ant-design-vue/lib/locale/en_US'
import antdZhLocale from 'ant-design-vue/lib/locale/zh_CN'
import antdEsLocale from 'ant-design-vue/lib/locale/es_ES'
import antdJaLocale from 'ant-design-vue/lib/locale/ja_JP'

// User defined lang
import enLocale from './en';
import zhLocale from './zh';
import esLocale from './es';
import jaLocale from './ja';

export default {
    [LocaleType.en]: { ...enLocale, ...antdEnLocale },
    [LocaleType.zh]: { ...zhLocale, ...antdZhLocale },
    [LocaleType.es]: { ...esLocale, ...antdEsLocale },
    [LocaleType.jp]: { ...jaLocale, ...antdJaLocale },
} as any;
