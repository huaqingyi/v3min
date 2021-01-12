import { LocaleType } from '../types';
// antd built-in lang
import antdEnLocale from 'ant-design-vue/lib/locale/en_US'
import antdZhLocale from 'ant-design-vue/lib/locale/zh_CN'
import antdEsLocale from 'ant-design-vue/lib/locale/es_ES'
import antdJpLocale from 'ant-design-vue/lib/locale/ja_JP'

import enUS from 'vxe-table/lib/locale/lang/en-US';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import jaJP from 'vxe-table/lib/locale/lang/ja-JP';

// User defined lang
import enLocale from './en';
import zhLocale from './zh';
import esLocale from './es';
import jpLocale from './jp';

export default {
    [LocaleType.en]: { ...enLocale, ...antdEnLocale, ...enUS },
    [LocaleType.zh]: { ...zhLocale, ...antdZhLocale, ...zhCN },
    [LocaleType.es]: { ...esLocale, ...antdEsLocale },
    [LocaleType.jp]: { ...jpLocale, ...antdJpLocale, ...jaJP },
} as any;
