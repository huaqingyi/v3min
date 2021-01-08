import { createApp, defineComponent } from 'vue';
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';
import { useI18n } from 'vue-i18n';
// import App from './app.vue';

export const app = createApp(defineComponent({
    components: { ServiceWorkerUpdatePopup },
    render(this: any) {
        return (
            <a-config-provider locale={useI18n().messages}>
                <router-view></router-view>
                <service-worker-update-popup />
            </a-config-provider>
        );
    }
}));
