export class DevlopmentUser {
    public errcode?: number;
    public errmsg?: string;
    public userid: string;
    public name: string;
    public department: any[];
    public position: string;
    public mobile: string | number;
    public gender: string | number;
    public email: string;
    public avatar: string;
    public status: number;
    public isleader: number;
    public extattr: any;

    constructor() {
        this.errcode = 0;
        this.errmsg = 'ok';
        this.userid = 'development';
        this.name = '开发者';
        this.department = [];
        this.position = '开发者';
        this.mobile = 13211111111;
        this.gender = 1;
        this.email = '';
        this.avatar = '';
        this.status = 1;
        this.isleader = 0;
        this.extattr = {
            departmentTrans: ['开发者'],
        };
    }
}
