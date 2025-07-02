import { Meta } from "../../types/common.js";

export interface UserAttributes {
    id: number;
    external_id: string | null;
    uuid: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    language: string;
    root_admin: boolean;
    '2fa': boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    object: 'user';
    attributes: UserAttributes;
}


export interface UsersList {
    object: 'list';
    data: User[];
    meta: Meta;
}