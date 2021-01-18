<script lang="tsx">
import { defineComponent, ref, onMounted, h } from 'vue';

export default defineComponent({
    props: ['component'],
    setup() {
    },
    render() {
        return 111;
        return h(this.component);
    }
});
</script>
