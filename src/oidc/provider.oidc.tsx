import { defineComponent, h, watch, computed, ref } from 'vue';
import { find } from 'lodash';

export const ProviderOidc = defineComponent({
    props: ['oidc', 'whiteList'],
    setup(props) {
        const is = ref<boolean>(false);

        const authRoute = async (path: string) => {
            const isWhite = find(props.whiteList || [], white => {
                if (white.test) { return white.test(path); }
                return white === path;
            }) ? true : false;
            if (isWhite) {
                return is.value = true;
            }
            return props.oidc.then(() => {
                return is.value = true;
            }).catch((err: Error) => {
                console.error(err);
                return is.value = false;
            });
        }

        return { is, authRoute };
    },
    async created() {
        watch(computed(() => this.$route.fullPath), () => {
            this.authRoute(this.$route.path);
        });
        this.authRoute(this.$route.path);
        // console.log(await this.oidc);
    },
    render() {
        return (
            <>
                {this.is !== false && this.$slots.default && h(this.$slots.default)}
            </>
        );
    },
});