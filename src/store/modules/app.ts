import { VuexModule, Module, Mutation, Action, getModule } from 'vue-pandora-decorators';
import store from '@/store';

export enum DeviceType {
    Mobile,
    Desktop,
}

export interface IAppState {
    cancelToken: any[];
}

@Module({ dynamic: true, store, name: 'app' })
class AppStore extends VuexModule implements IAppState {

    public cancelToken: any[];

    constructor(module: AppStore) {
        super(module);
        this.cancelToken = [];
    }

    @Action
    public execCancelToken() {
        return this.execCancelTokenSuccess();
    }

    @Mutation
    private execCancelTokenSuccess() {
        this.cancelToken.forEach(executor => {
            executor('路由跳转取消上个页面的请求');
        });
        this.cancelToken = [];
        return this.cancelToken;
    }

    @Action
    public pushCancelToken(payload: { cancelToken: any }) {
        return this.pushCancelTokenSuccess(payload);
    }

    @Mutation
    private pushCancelTokenSuccess(payload: { cancelToken: any }) {
        this.cancelToken.push(payload.cancelToken);
        return this.cancelToken;
    }
}

export const App = getModule(AppStore);