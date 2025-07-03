import { Meta } from '../common.js';

export interface NodesList {
    object: 'list';
    data: Node[];
    meta: Meta;
}

export interface Node {
    object: 'node';
    attributes: NodeAttributes;
}

export interface NodeAttributes {
    id: number;
    uuid: string
    public: boolean;
    name: string;
    description: string;
    location_id: number;
    scheme: string;
    fqdn: string;
    behind_proxy: boolean;
    maintenance_mode: boolean;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_listen: number;
    daemon_sftp: number;
    daemon_base: string;
    created_at: string;
    updated_at: string;
}

export interface NodeResponse {
    data: Node[];
}

export interface NodeIdRequest {
    id?: number;
};
