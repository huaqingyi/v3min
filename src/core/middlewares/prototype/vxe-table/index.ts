import { App } from 'vue';
import { input } from './input';
import { BaseSchema } from 'yup';

export type VXETableEditRowRules<P = any> = {
    [K in keyof P]?: BaseSchema;
}

export async function VXETablePrototype(app: App) {
    await input(app);
    return await app;
}
