import { defineComponent } from 'vue';

export const Compvar = defineComponent({
    props: {
        component: { required: true }
    },
    render() {
        const Comp: any = this.component;
        return Comp ? <Comp /> : <div />
    }
});
