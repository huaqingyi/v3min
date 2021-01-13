import { App } from 'vue';
import VXETable from 'vxe-table';
import config from '@/config/table';

export function vextable(app: App) {
    VXETable.setup(config);
    return app.use(VXETable);
}