import { ServerSignals } from '../../enums.js';

export interface ServerLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
}

export interface ServerFeatureLimits {
    databases: number;
    allocations: number;
    backups: number;
}

export interface SftpDetails {
    ip: string;
    port: number;
}

export interface AllocationAttributes {
    id: number;
    ip: string;
    ip_alias: string | null;
    port: number;
    notes: string | null;
    is_default: boolean;
}

export interface Allocation {
    object: "allocation";
    attributes: AllocationAttributes;
}

export interface AllocationsList {
    object: "list";
    data: Allocation[];
}

export interface ServerRelationships {
    allocations: AllocationsList;
}

export interface ServerAttributes {
    server_owner: boolean;
    identifier: string;
    uuid: string;
    name: string;
    node: string;
    sftp_details: SftpDetails;
    description: string;
    limits: ServerLimits;
    feature_limits: ServerFeatureLimits;
    is_suspended: boolean;
    is_installing: boolean;
    relationships: ServerRelationships;
}

export interface ServerMeta {
    is_server_owner: boolean;
    user_permissions: string[];
}

export interface IdentifierRequest {
    identifier: string;
}

export interface Server {
    object: "server";
    attributes: ServerAttributes;
    meta: ServerMeta;
}

export interface ServerResponse {
    attributes: Server;
}

export interface Websocket {
    token: string;
    socket: string;
}

export interface WebsocketResponse {
    data: Websocket;
}