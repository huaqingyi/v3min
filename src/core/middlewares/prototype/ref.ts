import { App } from 'vue';

export function refPrototype(app: App) {
    app.config.globalProperties.$setRef = function setRef(callback: (t: any) => string) {
        const t = new Proxy<any>({}, {
            get(target, key) {
                return key;
            }
        });
        const name = callback(t);
        return (ref: any) => this[name] = ref;
    };
    return app;
}