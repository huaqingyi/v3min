import { InputTypes, StyleForm } from './type';

export const backgroundColor = {
    'background-color': {
        title: `背景色`,
        type: InputTypes.COLORPICKER,
        default: '#fff',
    },
} as StyleForm;

export const styles = {
    ...backgroundColor,
}
