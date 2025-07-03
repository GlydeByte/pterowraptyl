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

export interface UsersResponse {
    data: User[];
}

export interface UserIdRequest {
    id?: number;
    external_id?: string;
};

/**
 * Represents the payload for creating or updating a user.
 *
 * @property {string} [email] - User's email address. Required when creating a new user.
 * @property {string} [username] - User's username. Required when creating a new user.
 * @property {string} [first_name] - User's first name. Required when creating a new user.
 * @property {string} [last_name] - User's last name. Required when creating a new user.
 * @property {string} [password] - User's password.
 * @property {string} [external_id] - Optional external identifier for the user.
 * @property {boolean} [root_admin] - Whether the user should have root admin privileges.
 */
export interface UserRequest {
    email?: string; // User's email address - needs to be specified for creation
    username?: string; // User's username - needs to be specified for creation
    first_name?: string; // User's first name - needs to be specified for creation
    last_name?: string; // User's last name - needs to be specified for creation
    password?: string; 
    external_id?: string;
    root_admin?: boolean;
};