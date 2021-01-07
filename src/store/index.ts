import { createStore } from 'vuex';
import { IAppState, ILayoutState, IUserState, IPermissionState } from './modules';

export interface IRootState {
    app: IAppState;
    setting: ILayoutState;
    user: IUserState;
    permission: IPermissionState;
}

export default createStore<IRootState>({});