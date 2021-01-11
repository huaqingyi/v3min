export enum InputTypes {
    INPUT = 'input',
    SELECT = 'select',
    UPLOAD = 'upload',
    SLOTS = 'slots',
}

export enum StyleInputTypes {
    INPUT = 'input',
    SELECT = 'select',
    UPLOAD = 'upload',
    COLORPICKER = 'color-picker',
}

export interface SelectItem {
    id: number;
    name: string;
    col?: number;
}

export interface Attr {
    title: string;
    type: InputTypes;
    store?: SelectItem[];
    default?: number | string | boolean;
    disable?: boolean;
}

export interface StyleAttr {
    title: string;
    type: StyleInputTypes;
    store?: SelectItem[];
    default?: number | string | boolean;
    disable?: boolean;
}

export interface StyleForm {
    [styleAttr: string]: StyleAttr;
}

export interface AttrFrom {
    [attrName: string]: Attr;
}

export interface Configs {
    styles?: StyleForm;
    attrs?: AttrFrom;
}
