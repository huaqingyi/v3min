import { createApp, defineComponent } from 'vue';
import { Component, Vue } from 'vue-pandora-decorators';
// import App from './app.vue';

export const app = createApp(defineComponent({
    render(this: any) {
        return (
            <a-config-provider locale={this.locale}>
                <router-view></router-view>
            </a-config-provider>
        );
    }
}));
