import { EditoolStore } from '@/pages/editools/store';
import { App, DirectiveBinding, ObjectDirective, VNode } from 'vue';
import { useAction } from 'vue-pandora-decorators';

export enum DraggerType {
    COMPONENT = 'component',
}

export interface DraggerData extends Object {
    type: DraggerType;
    component: string;
    id: number;
}

export interface Draggerable {
    width: number;
    height: number;
    x: number;
    y: number;
    type: DraggerType,
    component: string;
    id: number;
}

export interface Draggerables {
    [id: number]: Draggerable;
}

export function draggerables(app: App) {
    app.directive('draggerables', new (class implements ObjectDirective {
        public beforeMount(
            el: Element, binding: DirectiveBinding<DraggerData>, vnode: VNode,
        ) {
            // console.log(111, el, binding.value, vnode);
            // const width = el.clientWidth;
            // const height = el.clientHeight;
            // const x = el.clientTop;
            // const y = el.clientLeft;
            // console.log(width, height, x, y);
        }
        public async mounted(
            el: Element, binding: DirectiveBinding<DraggerData>, vnode: VNode,
        ) {
            const width = el.getBoundingClientRect().width;
            const height = el.getBoundingClientRect().height;
            const x = el.getBoundingClientRect().top;
            const y = el.getBoundingClientRect().left;
            const { type, component, id } = binding.value;
            useAction(EditoolStore).setDraggerable({ width, height, x, y, type, component, id })
            // console.log(width, height, x, y, type, component, id);
        }
        beforeUpdate() { } // new
        updated() { }
        beforeUnmount() { } // new
        unmounted() { }
    }));
}
