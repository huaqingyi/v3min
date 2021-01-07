import { VuexModule, Module, Mutation, Action, getModule } from 'vue-pandora-decorators';
import store from '@/store';

export interface IUserState {
}

@Module({ dynamic: true, store, name: 'user' })
class UserStore extends VuexModule implements IUserState {

    constructor(module: UserStore) {
        super(module);
    }

    // @Action
    // public logOut() {
    //     this.removeToken();
    // }

    // @Mutation
    // private removeToken() {
    //     this.token = '';
    //     localStorage.removeItem('token');
    // }
}

export const User = getModule(UserStore);