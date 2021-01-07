import { Service } from 'vue-pandora-decorators';
import { ResponseImpl } from '@/impls/response.impl';
import { ListRequsetImpl } from '@/impls/list.request.impl';

export interface TestDashboardData {
    username: string;
    password: string;
}

export class DashboardResponse extends ResponseImpl {
    public data: TestDashboardData[];
    constructor() {
        super();
        this.data = [];
    }
}

export interface DashboardTestRequset extends ListRequsetImpl { }

export class DashboardService extends Service {
    public async test(data: DashboardTestRequset): Promise<DashboardResponse> {
        // return this.http.get<DashboardTestRequset, DashboardResponse>('rts/consoleapi/init', { data });
        return { err: '', errno: 0, errmsg: '', data: [] };
    }
}
