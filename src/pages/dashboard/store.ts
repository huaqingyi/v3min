import { Module, VuexModule, Action, Mutation } from 'vue-pandora-decorators';
import store from '@/store';
import { DashboardResponse, DashboardService, DashboardTestRequset } from './service';

export interface IDashboardState {
    datatime: string;
    tableData: DashboardResponse;
}

@Module({ store })
export class DashboardStore extends VuexModule implements IDashboardState {

    public service: DashboardService;
    public datatime: string;
    public tableData: DashboardResponse;

    constructor(module: DashboardStore) {
        super(module);
        this.service = new DashboardService();
        this.datatime = String((new Date()).getTime());
        this.tableData = new DashboardResponse();
    }

    @Action({ commit: 'testSuccess' })
    public async test(data: DashboardTestRequset) {
        return await this.service.test(data);
    }

    @Mutation
    public async testSuccess(data: DashboardResponse) {
        this.tableData = data;
        this.datatime = String((new Date()).getTime());
    }
}