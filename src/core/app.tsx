import { computed, createApp } from 'vue';
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';
import { useI18n } from 'vue-i18n';
import { getLocale } from '@/locales';
import { bootstrap } from '@/oidc/yf';
import { ProviderOidc } from '@/oidc';
import config from '@/config/yf';
import whiteList from '@/config/whitList';

export const app = createApp({
    components: { ServiceWorkerUpdatePopup },
    setup() {
        const locale = computed(() => (useI18n().messages.value as any)[getLocale()]);
        return { locale };
    },
    render() {
        return (
            <ProviderOidc whiteList={whiteList} oidc={bootstrap(config)}>
                <a-config-provider locale={this.locale}>
                    <router-view></router-view>
                    <service-worker-update-popup />
                </a-config-provider>
            </ProviderOidc>
        );
    }
});
