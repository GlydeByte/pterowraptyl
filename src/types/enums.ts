export enum ServerSignals {
    START = "start",
    STOP = "stop",
    RESTART = "restart",
    KILL = "kill",
}

export enum IncludeParameters {
    EGG = "egg",
    SUBUSERS = "subusers",
    PASSWORD = "password",
    SERVERS = "servers",
    ALLOCATIONS = "allocations",
    LOCATION = "location",
    NODE = "node",
    SERVER = "server",
    USER = "user",
    PACK = "pack",
    NEST = "nest",
    EGGS = "eggs",
    VARIABLES = "variables",
    NODES = "nodes",
    DATABASES = "databases",
    HOST = "host",
    CONFIG = "config",
    SCRIPT = "script"
};

export enum FilterParameters {
    EMAIL = "email",
    UUID = "uuid",
    USERNAME = "username",
    EXTERNAL_ID = "external_id"
};

export enum SortParameters {
    ID = "id",
    UUID = "uuid"
}