import { Module, VuexModule, Action, Mutation } from 'vue-pandora-decorators';
import store from '@/store';
import { EditoolService, ComponentsResponse, ComponentsRequest } from './service';
import { Draggerable, Draggerables } from '@/directives';

export interface IEditoolState {
    components: ComponentsResponse;
    draggerables: Draggerables;
}

@Module({ store })
export class EditoolStore extends VuexModule implements IEditoolState {

    public service: EditoolService;
    public components: ComponentsResponse;
    public draggerables: Draggerables;

    constructor(module: EditoolStore) {
        super(module);
        this.service = new EditoolService();
        this.components = new ComponentsResponse();
        this.draggerables = {};
    }

    @Action({ commit: 'getComponentsSuccess' })
    public async getComponents(data: ComponentsRequest) {
        return await this.service.getComponents(data);
    }

    @Mutation
    public async getComponentsSuccess(data: ComponentsResponse) {
        this.components = data;
    }

    @Action({ commit: 'setDraggerableSuccess' })
    public async setDraggerable(data: Draggerable) {
        return data;
    }

    @Mutation
    public async setDraggerableSuccess(data: Draggerable) {
        this.draggerables[data.id] = data;
    }
}