import { UserManage } from './userManage';

export class MainApi {
    public user = new UserManage();
}

export const api = new MainApi();