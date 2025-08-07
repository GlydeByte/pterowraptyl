import { ServerSignals } from '../enums.js';

export interface ServerLimits {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
}

export interface ServerUpdateRequest {
    id: number;
    user_id: number;
    name?: string;
    external_id?: string;
    description?: string;
}

export interface ReinstallServerRequest {
    id: number;
    force?: boolean;
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

export interface ServerIdRequest {
    id: string;
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

export interface ServerListResponse {
  object: "list";
  data: {
    object: "server";
    attributes: ServerAttributes;
  }[];
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

export interface ServerResources {
    object: "stats";
    current_state: string;
    is_suspended: boolean;
    resources: {
        memory_bytes: number;
        cpu_absolute: number;
        disk_bytes: number;
        network_rx_bytes: number;
        network_tx_bytes: number;
    };
}

export interface ServerResourcesResponse {
    attributes: ServerResources;
};

export interface CreateServerLimits {
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
  threads?: string;
  oom_disabled?: boolean;
}

export interface CreateServerFeatureLimits {
  databases: number;
  allocations: number;
  backups: number;
}

export interface CreateServerAllocation {
  default: number;
  additional?: number[];
}

export interface CreateServerRequest {
  name: string;
  user: number;
  egg: number;
  docker_image?: string;
  startup?: string;
  environment?: Record<string, string>;
  limits: CreateServerLimits;
  feature_limits: CreateServerFeatureLimits;
  allocation: CreateServerAllocation;
  deploy?: {
    locations: number[];
    dedicated_ip: boolean;
    port_range: string[];
  };
}

export interface ServerBuildUpdateRequest {
  id: number;
  allocation: number;
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
  threads?: string;
  feature_limits: {
    databases: number;
    allocations: number;
    backups: number;
  };
  add_allocations?: number[];
  remove_allocations?: number[];
  oom_disabled?: boolean;
}

export interface ServerStartupUpdateRequest {
  id: number;
  startup: string;
  environment: Record<string, string>;
  egg: number;
  image?: string;
  skip_scripts?: boolean;
}
