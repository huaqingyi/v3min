import { App } from 'vue';
import Antd from 'ant-design-vue';

export function antd(app: App){
    return app.use(Antd);
}