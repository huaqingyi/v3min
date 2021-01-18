import { App, ref } from 'vue';
import VXETable from 'vxe-table';
import { Form, Select } from 'ant-design-vue';
import { _useForm } from './use';
import { map } from 'lodash';

export function select(app: App) {
    // 创建一个简单输入框渲染器
    VXETable.renderer.add('editorSelect', {
        // 可编辑激活模板
        renderEdit(renderOpts, { row, column, rowIndex, $table }) {
            const { tableRules }: any = $table.props.editConfig;
            const { validateInfos } = _useForm(row, tableRules, $table);

            const options = ref<any[]>([]);
            if (renderOpts.options && (renderOpts.options as any).then) {
                (renderOpts.options as any).then((data: any[]) => options.value = data);
            } else {
                options.value = renderOpts.options || [];
            }

            const { config }: any = renderOpts;
            return [
                <Form.Item class="vxe-table-editor-form">
                    <Select {...(validateInfos[column.property] || {})} onChange={value => {
                        row[column.property] = value;
                    }} value={row[column.property]} {...(config || {})} class="vxe-table-editor-form-inputs">
                        {map(options.value, option => (
                            <Select.Option value={option.id}>{option.name}</Select.Option>
                        ))}
                    </Select>
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