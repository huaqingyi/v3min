import { computed, createApp, defineComponent } from 'vue';
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';
import { useI18n } from 'vue-i18n';
import { getLocale } from '@/locales';

export const app = createApp(defineComponent({
    components: { ServiceWorkerUpdatePopup },
    setup() {
        const locale = computed(() => (useI18n().messages.value as any)[getLocale()]);
        return { locale };
    },
    render() {
        return (
            <a-config-provider locale={this.locale}>
                <router-view></router-view>
                <service-worker-update-popup />
            </a-config-provider>
        );
    }
}));
