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
    BACKUPS = "backups",
    HOST = "host",
    CONFIG = "config",
    SCRIPT = "script"
};

export enum FilterParameters {
    EMAIL = "email",
    UUID = "uuid",
    USERNAME = "username",
    NAME = "name",
    IMAGE = "image",
    EXTERNAL_ID = "external_id",
    SHORT = "short",
    LONG = "long"
};

export enum SortParameters {
    ID = "id",
    UUID = "uuid",
    NAME = "name",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    SHORT = "short",
    LONG = "long"
}