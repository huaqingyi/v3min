import { Module, VuexModule, Action, Mutation } from 'vue-pandora-decorators';
import store from '@/store';
import { EditoolService, ComponentsResponse, ComponentsRequest } from './service';

export interface IEditoolState {
    components: ComponentsResponse;
}

@Module({ store })
export class EditoolStore extends VuexModule implements IEditoolState {

    public service: EditoolService;
    public components: ComponentsResponse;

    constructor(module: EditoolStore) {
        super(module);
        this.service = new EditoolService();
        this.components = new ComponentsResponse();
    }

    @Action({ commit: 'getComponentsSuccess' })
    public async getComponents(data: ComponentsRequest) {
        return await this.service.getComponents(data);
    }

    @Mutation
    public async getComponentsSuccess(data: ComponentsResponse) {
        this.components = data;
    }
}