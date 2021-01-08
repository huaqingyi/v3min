import { App, Plugin } from 'vue';
import PageHeader from './pageHeader/index.vue';
import PageLayout from './pageLayout/index.vue';
import PageFooter from './pageFooter/index.vue';
import CardBase from './cardBase/index.vue';
import Count from './count/index.vue';
import { map } from 'lodash';
import { Compvar, Asyncomponent } from './factory';

const components = {
    'page-footer': PageFooter,
    'page-header': PageHeader,
    'page-layout': PageLayout,
    'card-base': CardBase,
    'count': Count,
    'comp-var': Compvar,
    'async-component': Asyncomponent,
};

const install: any & Plugin = (app: App) => {
    if (install.installed) return;
    map(components, (component, name) => app.component(name, component));
}

export default {
    install,
    Compvar,
    PageFooter, PageHeader, PageLayout, CardBase, Count
}
