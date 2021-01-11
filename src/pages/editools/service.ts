import { Service } from 'vue-pandora-decorators';
import { ResponseImpl } from '@/impls/response.impl';

export enum ComponentsType {
    BUILTIN = 'built-in',
}

export interface ComponentsRequest {
    type: ComponentsType;
}

// export interface ComponentsData {

// }

export class ComponentsResponse extends ResponseImpl {
    public data: string[];
    constructor() {
        super();
        this.data = [];
    }
}

export class EditoolService extends Service {
    public async getComponents(data: ComponentsRequest): Promise<ComponentsResponse> {
        // return this.http.get<DashboardTestRequset, DashboardResponse>('rts/consoleapi/init', { data });
        return {
            err: '', errno: 0, errmsg: '',
            data: ['jz-main', 'jz-main', 'jz-main', 'jz-main'],
        };
    }
}
