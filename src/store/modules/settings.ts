/*
 * @FilePath: /core-factory/src/store/modules/settings.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-16 10:20:32
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-16 11:13:20
 * @debugger: 
 */
import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import elementVariables from '@/styles/element-variables.scss';
import defaultSettings from '@/config/settings';

export interface SettingsState {
    theme: string;
    fixedHeader: boolean;
    showSettings: boolean;
    showTagsView: boolean;
    showSidebarLogo: boolean;
    sidebarTextTheme: boolean;
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements SettingsState {
    public theme = elementVariables.theme;
    public fixedHeader = defaultSettings.fixedHeader;
    public showSettings = defaultSettings.showSettings;
    public showTagsView = defaultSettings.showTagsView;
    public showSidebarLogo = defaultSettings.showSidebarLogo;
    public sidebarTextTheme = defaultSettings.sidebarTextTheme;

    @Action
    public ChangeSetting(payload: { key: string; value: any }) {
        this.CHANGE_SETTING(payload);
    }

    @Mutation
    private CHANGE_SETTING(payload: { key: string; value: any }) {
        const { key, value } = payload;
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            (this as any)[key] = value;
        }
    }
}

export const SettingsModule = getModule(Settings);
