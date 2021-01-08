import { defineComponent, ref, onMounted } from 'vue';

export const Asyncomponent = defineComponent({
    setup() {
        const loading = ref(true);
        const content: any = <div />;
        return { loading, content };
    },
    render() {
        onMounted(async () => {
            this.content = await this.$slots.default;
            this.loading = false;
        });
        return this.loading === false && this.content;
    }
});
