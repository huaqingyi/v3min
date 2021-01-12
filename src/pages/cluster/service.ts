import { Service } from 'vue-pandora-decorators';
import { ResponseImpl } from '@/impls/response.impl';
import { ListRequsetImpl } from '@/impls/list.request.impl';

export interface TestClusterData {
    username: string;
    password: string;
}

export class ClusterResponse extends ResponseImpl {
    public data: TestClusterData[];
    constructor() {
        super();
        this.data = [];
    }
}

export interface ClusterTestRequset extends ListRequsetImpl { }

export class ClusterService extends Service {
    public async test(data: ClusterTestRequset): Promise<ClusterResponse> {
        // return this.http.get<ClusterTestRequset, ClusterResponse>('rts/consoleapi/init', { data });
        return { err: '', errno: 0, errmsg: '', data: [] };
    }
}
