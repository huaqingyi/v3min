import { createApp, defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const app = createApp(defineComponent({
    render: () => (
        <>
            <RouterView />
        </>
    ),
}));

app.component('home-index', () => (
    <div>Home ...</div>
));

app.component('decorator-test1', () => (
    <div>Decorator ...</div>
))
