import { PteroClient, PteroApp } from "./core/client.js";
import { AccountsModule } from "./modules/AccountsModule.js";
import { ServersModule } from "./modules/ServersModule.js";

// exports
export { PteroClient, PteroApp } from "./core/client.js";
export { AccountsModule } from "./modules/AccountsModule.js";
export { ServersModule } from "./modules/ServersModule.js";

//exports of types
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
  ServerResources
} from "./types/servers/servers.js";

export { IncludeParameters } from "./types/enums.js";
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
  public servers?: ServersModule;

  constructor(client?: PteroClient, app?: PteroApp) {
    this.client = client;
    this.app = app;

    if (this.client) {
      this.accounts = new AccountsModule(this.client);
      this.servers = new ServersModule(this.client);
    }
  }
}
