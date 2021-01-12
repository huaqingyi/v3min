import { App } from 'vue';
import VXETable from 'vxe-table';
import { getI18n } from '@/locales/index';

export function vextable(app: App) {
    VXETable.setup({
        i18n: (key, args) => getI18n().global.t(key, args),
    });
    return app.use(VXETable);
}