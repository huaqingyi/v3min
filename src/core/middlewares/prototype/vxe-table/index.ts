import './styles.less';
import { App } from 'vue';
import { input } from './input';
import { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { select } from './select';

export type VXETableEditRowRules<P = any> = {
    [K in keyof P]?: ValidationRule[];
}

export async function VXETablePrototype(app: App) {
    await input(app);
    await select(app);
    return await app;
}
