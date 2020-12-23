import { createStore } from 'vuex';
import { PermissionState } from './modules/permission';
import { SettingsState } from './modules/settings';
import { UserState } from './modules/user';

export interface IRootState {
    permission: PermissionState;
    setting: SettingsState;
    user: UserState;
}

export default createStore<IRootState>({});
