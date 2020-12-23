/*
 * @FilePath: /vue3-template/src/pages/home/store.ts
 * @Descripttion: 
 * @version: 
 * @Author: 易华青
 * @Date: 2020-12-22 15:43:21
 * @LastEditors: huaqingyi
 * @LastEditTime: 2020-12-23 12:16:26
 * @debugger: 
 */
import { VuexModule, Module, Action, Mutation, MutationAction } from 'vue-pandora-decorators';
import store from '@/store';

export interface HomeState {
    username: string;
    password: string;
}

@Module({ store })
export class Home extends VuexModule implements HomeState {
    public username: string;
    public password: string;

    constructor(props: any) {
        super(props);
        this.username = 'init';
        this.password = 'init';
    }

    @Action({ commit: 'setTestSuccess' })
    public setTest(data: HomeState) {
        // console.log(1111111111111111112, obj, this);
        // return { username: 'aaa', password: 'xxx' };
        return data;
    }

    @Mutation
    private setTestSuccess({ username, password }: HomeState) {
        this.username = username;
        this.password = password;
    }

    // @MutationAction({ mutate: ['username', 'password'] })
    // public async setTest(data: HomeState) {
    //     return data;
    // }
}
