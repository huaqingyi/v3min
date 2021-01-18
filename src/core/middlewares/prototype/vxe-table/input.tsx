import { App } from 'vue';
import VXETable from 'vxe-table';
import { Input, Form } from 'ant-design-vue';
import { _useForm } from './use';

export function input(app: App) {
    // 创建一个简单输入框渲染器
    VXETable.renderer.add('editorInput', {
        // 可编辑激活模板
        renderEdit(renderOpts, { row, column, rowIndex, $table }) {
            const { tableRules }: any = $table.props.editConfig;
            const { validateInfos } = _useForm(row, tableRules, $table);
            return [
                <Form.Item class="vxe-table-editor-form" {...(validateInfos[column.property] || {})}>
                    <Input value={row[column.property]} onInput={({ target }) => {
                        row[column.property] = target.value;
                    }} class="vxe-table-editor-form-inputs" />
                </Form.Item>
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