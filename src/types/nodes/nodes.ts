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

export interface NodeUpdateRequest {
    id?: number;
    name?: string;
    description?: string;
    location_id?: number;
    fqdn?: string;
    scheme?: string;
    behind_proxy?: boolean;
    public?: boolean;
    daemon_base?: string;
    daemon_sftp?: number;
    daemon_listen?: number;
    memory?: number;
    memory_overallocate?: number;
    disk?: number;
    disk_overallocate?: number;
    upload_size?: number;
    maintenance_mode?: boolean;
}


export interface NodeResponse {
    data: Node[];
}

export interface NodeIdRequest {
    id?: number;
};

export interface NodeConfig {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: {
        host: string;
        port: number;
        ssl: {
            enabled: boolean;
            cert: string;
            key: string;
        };
        upload_limit: number;
    };
    system: {
        data: string;
        sftp: {
            bind_port: number;
        };
    };
    remote: string;
}

export interface NodeRequest {
    name: string;
    location_id: number;
    scheme: string;
    memory: number;
    memory_overallocate: number;
    disk: number;
    disk_overallocate: number;
    upload_size: number;
    daemon_sftp: number;
    daemon_listen: number;

    /**
     * only for updating node
     */
    maintenance_mode?: boolean;
    
    /**
     * Only for updating node ... updateNode({});
     */
    behind_proxy?: boolean;
}
   