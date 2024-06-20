import { IRole } from './role.model';

export interface IAccount {
    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    image?: string;
    status?: boolean;
    userName?: string;
    userType?: string;
    tenantId?: number;
    roles:IRole[];
    passwordChangeRequired?: boolean;
}
