import { App, h } from 'vue';
import VXETable from 'vxe-table';
import { Input, message } from 'ant-design-vue';
import { find } from 'lodash';

export function input(app: App) {
    // 创建一个简单输入框渲染器
    VXETable.renderer.add('editorInput', {
        // 可编辑激活模板
        renderEdit(renderOpts, { row, column, rowIndex, $table }) {
            return [
                h(Input, {
                    value: row[column.property],
                    onInput: ({ target }) => row[column.property] = target.value,
                    onPressEnter: async ({ target }) => {
                        const { tableRules }: any = $table.props.editConfig;
                        const err: any = await new Promise(r => tableRules[column.property].validate(
                            row[column.property]
                        ).catch((err: Error) => r({
                            name: err.name, message: err.message,
                        })).then(() => r(true)));
                        if (err !== true) {
                            return await message.error(`${column.title}: ${err.message}`);
                        }
                        return await $table.clearActived();
                    },
                    onBlur: async () => {
                        const { editSubmit }: any = $table.props.editConfig;
                        const nrow = { ...row };
                        delete nrow._XID;
                        editSubmit(row[column.property], column.property, nrow, rowIndex);
                    }
                }),
            ]
        },
        // 可编辑显示模板
        renderCell(renderOpts, { row, column }) {
            return [
                <span>{row[column.property]}</span>
            ]
        },
    });
    return app;
}