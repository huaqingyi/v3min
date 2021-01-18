import { VXETableSetupOptions } from 'vxe-table';
import { getI18n } from '@/locales';

export default {
    i18n: (key, args) => getI18n().global.t(key, args),
    table: {
        // keyboardConfig: { enterToTab: true, }
    },
} as VXETableSetupOptions;
