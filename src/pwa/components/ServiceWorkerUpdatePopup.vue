<script lang="ts">
import { h } from 'vue';
import { Component, Vue } from 'vue-pandora-decorators';

@Component({ name: 'ServiceWorkerUpdatePopup' })
export default class extends Vue {
    public refreshing: boolean;
    public notificationText: string;
    public refreshButtonText: string;
    public registration: ServiceWorkerRegistration | null;

    constructor() {
        super(arguments);
        this.refreshing = false;
        this.notificationText = 'New content is available!';
        this.refreshButtonText = 'Refresh';
        this.registration = null;
    }

    public async created() {
        // Listen for swUpdated event and display refresh notification as required.
        document.addEventListener('swUpdated', this.showRefreshUI, {
            once: true,
        });
        // Refresh all open app tabs when a new service worker is installed.
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.refreshing) return;
            this.refreshing = true;
            window.location.reload();
        });
    }

    public render() {
        // Avoid warning for missing template
    }

    private showRefreshUI(e: Event) {
        // Display a notification inviting the user to refresh/reload the app due
        // to an app update being available.
        // The new service worker is installed, but not yet active.
        // Store the ServiceWorkerRegistration instance for later use.
        this.registration = (e as CustomEvent).detail;
        (this as any).$notify.info({
            title: 'Update available',
            message: h('div', { class: 'sw-update-popup' }, [
                this.notificationText,
                h('br'),
                h(
                    'button',
                    {
                        on: {
                            click: (e: Event) => {
                                e.preventDefault();
                                this.refreshApp();
                            },
                        },
                    },
                    this.refreshButtonText
                ),
            ]),
            position: 'bottom-right',
            duration: 0,
        });
    }

    public refreshApp() {
        // Protect against missing registration.waiting.
        if (!this.registration || !this.registration.waiting) return;
        this.registration.waiting.postMessage('skipWaiting');
    }
}
</script>

<style lang="scss" scoped>
.sw-update-popup > button {
    margin-top: 0.5em;
    padding: 0.25em 1.5em;
}
</style>
