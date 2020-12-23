import { Service } from 'vue-pandora-decorators';

export class PermissionService extends Service {

    constructor() {
        super();
    }

    public async getRoles(): Promise<string[]> {
        // TODO 这里通过接口返回
        // return await this.http.get('xxx', {});
        return Promise.resolve(['admin']);
    }
}