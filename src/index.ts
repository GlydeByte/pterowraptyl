import { PteroClient, PteroApp } from "./core/client.js";
import { AccountsModule } from "./modules/AccountsModule.js";
import { ClientServersModule } from "./modules/ClientServersModule.js";
import { EggsModule } from "./modules/EggsModule.js";
import { LocationsModule } from "./modules/LocationsModule.js";
import { NestsModule } from "./modules/NestsModule.js";
import { NodesModule } from "./modules/NodesModule.js";
import { ServersModule } from "./modules/ServersModule.js";
import { UsersModule } from "./modules/UsersModule.js";

// exports
export { PteroError } from "./core/error.js";
export { PteroClient, PteroApp } from "./core/client.js";
export { AccountsModule } from "./modules/AccountsModule.js";
export { ClientServersModule } from "./modules/ClientServersModule.js";
export { EggsModule } from "./modules/EggsModule.js";
export { LocationsModule } from "./modules/LocationsModule.js";
export { NestsModule } from "./modules/NestsModule.js";
export { NodesModule } from "./modules/NodesModule.js";
export { ServersModule } from "./modules/ServersModule.js";
export { UsersModule } from "./modules/UsersModule.js";

//exports of types
export { Error } from "./types/errorObjects.js";
export {
  Account,
  AccountResponse,
  TwoFactor,
  TwoFactorResponse,
  TwoFactorEnableRequest,
  TwoFactorEnable,
  TwoFactorDisable,
} from "./types/accounts/accounts.js";
export {
  Server,
  ServerResponse,
  IdentifierRequest,
  ServerAttributes,
  ServerMeta,
  ServerLimits,
  ServerFeatureLimits,
  ServerRelationships,
  SftpDetails,
  AllocationsList,
  Allocation,
  AllocationAttributes,
  Websocket,
  ServerResources,
  ServerIdRequest,
  CreateServerRequest,
  CreateServerAllocation,
  CreateServerFeatureLimits,
  CreateServerLimits,
  ReinstallServerRequest,
  ServerUpdateRequest,
  ServerBuildUpdateRequest,
  ServerStartupUpdateRequest
} from "./types/servers/servers.js";
export {
  User,
  UserAttributes,
  UserUpdateRequest,
  UsersList,
  UserIdRequest,
  UserRequest,
} from "./types/users/users.js";
export {
  NodeAttributes,
  NodeIdRequest,
  NodeConfig,
  NodeUpdateRequest,
  AllocationDeleteRequest,
  AllocationRequest,
} from "./types/nodes/nodes.js";
export {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "./types/enums.js";
export {
  Pagination,
  Meta,
  PaginationOptions,
  PaginationLinks,
} from "./types/common.js";
export {
  CreateLocationRequest,
  LocationRelationships,
  LocationAttributes,
  LocationIdRequest,
  Location,
  LocationUpdateRequest
} from "./types/locations/locations.js";
/**
 * Main class for Pterodactyl API wrapper.
 * Everything is accessible through this class.
 * 
 * @example
 * ```ts
 * import { Ptero, PteroClient, PteroApp } from "ptero-wrapper";

// client is needed to access Pterodactyl API client endpoints such as 2fa, account details, etc.
// app is needed to access Pterodactyl API app endpoints such as servers, nodes, etc.
const client = new PteroClient(process.env.BASE_URL,process.env.PTERO_CLIENT_KEY);
const app = new PteroApp(process.env.BASE_URL, process.env.PTERO_APP_KEY);
// Ptero is the main class that combines both client and app.
// It provides methods to access both client and app endpoints in a single instance.
// You can use it to access both client and app endpoints without having to create separate instances.
// You can use only client or app or both, depending on your needs.
// Ptero class provides unified access to both client and app endpoints.
const ptero = new Ptero(client, app);

main();

async function main() {
    const account = await ptero.accounts.getAccount();
    console.log(account);
}
 */
export class Ptero {
  private client?: PteroClient;
  private app?: PteroApp;

  /**
   * Module for accessing Pterodactyl client account endpoints.
   * This module provides methods to access account details, 2fa, update account information, etc.
   */
  public accounts?: AccountsModule;
  public clientServers?: ClientServersModule;

  public eggs?: EggsModule;
  public locations?: LocationsModule;
  public nests?: NestsModule;
  public nodes?: NodesModule;
  public servers?: ServersModule;
  public users?: UsersModule;

  constructor(client?: PteroClient, app?: PteroApp) {
    this.client = client;
    this.app = app;

    if (this.client) {
      this.accounts = new AccountsModule(this.client);
      this.clientServers = new ClientServersModule(this.client);
    }

    if (this.app) {
      this.eggs = new EggsModule(this.app);
      this.locations = new LocationsModule(this.app);
      this.nests = new NestsModule(this.app);
      this.nodes = new NodesModule(this.app);
      this.servers = new ServersModule(this.app);
      this.users = new UsersModule(this.app);
    }
  }
}
