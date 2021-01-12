import { Module, VuexModule, Action, Mutation } from 'vue-pandora-decorators';
import store from '@/store';
import { ClusterResponse, ClusterService, ClusterTestRequset } from './service';

export interface IClusterState {
    datatime: string;
    tableData: ClusterResponse;
}

@Module({ store })
export class ClusterStore extends VuexModule implements IClusterState {

    public service: ClusterService;
    public datatime: string;
    public tableData: ClusterResponse;

    constructor(module: ClusterStore) {
        super(module);
        this.service = new ClusterService();
        this.datatime = String((new Date()).getTime());
        this.tableData = new ClusterResponse();
    }

    @Action({ commit: 'testSuccess' })
    public async test(data: ClusterTestRequset) {
        return await this.service.test(data);
    }

    @Mutation
    public async testSuccess(data: ClusterResponse) {
        this.tableData = data;
        this.datatime = String((new Date()).getTime());
    }
}