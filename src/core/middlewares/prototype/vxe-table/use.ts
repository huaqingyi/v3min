import { RowInfo, VxeTablePrivateMethods, VxeTableMethods } from "vxe-table";
import { ValidationRule } from 'ant-design-vue/lib/form/Form';
import { useForm as UF } from '@ant-design-vue/use';

export function _useForm(row: RowInfo, rules: { [x: string]: ValidationRule[]; }, $table: VxeTablePrivateMethods) {
    if (!$table.activedForm) { $table.activedForm = {}; }
    if (!$table.activedForm[row._XID]) { $table.activedForm[row._XID] = UF(row, rules); }
    return $table.activedForm[row._XID];
}

export function useForm($table: VxeTableMethods) {
    const { row } = $table.getActiveRecord();
    return $table.activedForm[row._XID];
}