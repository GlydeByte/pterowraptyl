import { RateLimitInfo } from "./core/rateLimit.js";
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
export { RateLimitManager, RateLimitInfo } from "./core/rateLimit.js";
export { ClientOptions } from "./core/client.js";

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
export {
  NestEggRequest,
  NestAttributes,
  NestIdRequest,
  EggIdRequest,
  NestRelationships,
  EggAttributes,
  Egg
} from "./types/nests/nests.js";
// ...existing imports...

/**
 * Main class for Pterodactyl API wrapper.
 * Everything is accessible through this class.
 * 
 * @example
 * ### Basic Usage
 * ```ts
 * import { Ptero, PteroClient, PteroApp } from "ptero-wrapper";
 * 
 * // Client is needed to access Pterodactyl API client endpoints such as 2fa, account details, etc.
 * // App is needed to access Pterodactyl API app endpoints such as servers, nodes, etc.
 * const client = new PteroClient(process.env.BASE_URL, process.env.PTERO_CLIENT_KEY);
 * const app = new PteroApp(process.env.BASE_URL, process.env.PTERO_APP_KEY);
 * 
 * // Ptero is the main class that combines both client and app.
 * // It provides methods to access both client and app endpoints in a single instance.
 * const ptero = new Ptero(client, app);
 * 
 * main();
 * 
 * async function main() {
 *     const account = await ptero.accounts.getAccount();
 *     console.log(account);
 * }
 * ```
 * 
 * @example
 * ### Rate Limiting Configuration
 * ```ts
 * import { Ptero, PteroClient, PteroApp } from "ptero-wrapper";
 * 
 * // Configure rate limiting options
 * const client = new PteroClient(
 *   process.env.BASE_URL, 
 *   process.env.PTERO_CLIENT_KEY,
 *   {
 *     enableAutoRetry: true,  // Automatically retry on 429 errors (default: true)
 *     maxRetries: 5,          // Maximum retry attempts (default: 3)
 *     baseDelay: 2000         // Base delay for exponential backoff in ms (default: 1000)
 *   }
 * );
 * 
 * const app = new PteroApp(
 *   process.env.BASE_URL, 
 *   process.env.PTERO_APP_KEY,
 *   {
 *     enableAutoRetry: true,
 *     maxRetries: 3,
 *     baseDelay: 1500
 *   }
 * );
 * 
 * const ptero = new Ptero(client, app);
 * ```
 * 
 * @example
 * ### Monitoring Rate Limits
 * ```ts
 * import { Ptero, PteroClient, PteroApp } from "ptero-wrapper";
 * 
 * const client = new PteroClient(process.env.BASE_URL, process.env.PTERO_CLIENT_KEY);
 * const app = new PteroApp(process.env.BASE_URL, process.env.PTERO_APP_KEY);
 * const ptero = new Ptero(client, app);
 * 
 * async function monitorRateLimits() {
 *   // Check current rate limit status
 *   const clientRateLimit = ptero.getClientRateLimit();
 *   const appRateLimit = ptero.getAppRateLimit();
 * 
 *   if (clientRateLimit) {
 *     console.log(`Client API: ${clientRateLimit.remaining}/${clientRateLimit.limit} requests remaining`);
 *     console.log(`Client API resets at: ${clientRateLimit.resetDate}`);
 *   }
 * 
 *   if (appRateLimit) {
 *     console.log(`App API: ${appRateLimit.remaining}/${appRateLimit.limit} requests remaining`);
 *     console.log(`App API resets at: ${appRateLimit.resetDate}`);
 *   }
 * 
 *   // Check if approaching limits
 *   if (ptero.isClientApproachingRateLimit()) {
 *     console.warn("Warning: Client API is approaching rate limit!");
 *   }
 * 
 *   if (ptero.isAppApproachingRateLimit()) {
 *     console.warn("Warning: Application API is approaching rate limit!");
 *   }
 * 
 *   // Make API calls - rate limiting is handled automatically
 *   try {
 *     const servers = await ptero.servers.getAllServers();
 *     console.log(`Found ${servers.data.length} servers`);
 *   } catch (error) {
 *     console.error("API call failed:", error);
 *   }
 * }
 * 
 * // Monitor rate limits every 30 seconds
 * setInterval(monitorRateLimits, 30000);
 * ```
 * 
 * @example
 * ### Advanced Rate Limit Handling
 * ```ts
 * import { Ptero, PteroClient, PteroApp, RateLimitInfo } from "ptero-wrapper";
 * 
 * const client = new PteroClient(process.env.BASE_URL, process.env.PTERO_CLIENT_KEY);
 * const ptero = new Ptero(client);
 * 
 * async function smartAPICall() {
 *   // Check rate limit before making expensive operations
 *   const rateLimit = ptero.getClientRateLimit();
 *   
 *   if (rateLimit && rateLimit.remaining < 10) {
 *     const timeUntilReset = rateLimit.resetDate.getTime() - Date.now();
 *     console.log(`Low on API calls (${rateLimit.remaining} remaining)`);
 *     console.log(`Waiting ${Math.ceil(timeUntilReset / 1000)}s until reset...`);
 *     
 *     // Wait until rate limit resets
 *     await new Promise(resolve => setTimeout(resolve, timeUntilReset + 1000));
 *   }
 * 
 *   // Now make the API call
 *   const account = await ptero.accounts.getAccount();
 *   return account;
 * }
 * ```
 * 
 * ## Rate Limiting Features
 * 
 * - **Automatic tracking**: Rate limit information is automatically extracted from API response headers
 * - **Smart delays**: The library automatically delays requests when approaching rate limits
 * - **Exponential backoff**: When rate limits are exceeded (429 errors), requests are retried with exponential backoff
 * - **Separate tracking**: Client API and Application API rate limits are tracked separately
 * - **Configurable**: Retry behavior, delays, and maximum attempts can be customized
 * - **Monitoring**: Current rate limit status and remaining requests are easily accessible
 * 
 * ## Rate Limit Information
 * 
 * Pterodactyl API implements the following rate limits:
 * - **Client API**: 240 requests per minute per API key
 * - **Application API**: 240 requests per minute per API key
 * 
 * Rate limit headers returned by the API:
 * - `X-RateLimit-Limit`: Maximum requests per minute (240)
 * - `X-RateLimit-Remaining`: Requests remaining in current window
 * - `X-RateLimit-Reset`: Unix timestamp when the rate limit resets
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

  /**
   * Gets current rate limit information for client API.
   * 
   * @returns Rate limit information including remaining requests and reset time, or undefined if no requests have been made yet
   * 
   * @example
   * ```ts
   * const rateLimit = ptero.getClientRateLimit();
   * if (rateLimit) {
   *   console.log(`${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
   *   console.log(`Resets at: ${rateLimit.resetDate}`);
   * }
   * ```
   */
  getClientRateLimit(): RateLimitInfo | undefined {
    return this.client?.getRateLimit();
  }

  /**
   * Gets current rate limit information for application API.
   * 
   * @returns Rate limit information including remaining requests and reset time, or undefined if no requests have been made yet
   * 
   * @example
   * ```ts
   * const rateLimit = ptero.getAppRateLimit();
   * if (rateLimit) {
   *   console.log(`${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
   *   console.log(`Resets at: ${rateLimit.resetDate}`);
   * }
   * ```
   */
  getAppRateLimit(): RateLimitInfo | undefined {
    return this.app?.getRateLimit();
  }

  /**
   * Checks if client API is approaching its rate limit (less than 10% remaining).
   * 
   * @returns True if approaching rate limit, false otherwise
   * 
   * @example
   * ```ts
   * if (ptero.isClientApproachingRateLimit()) {
   *   console.warn("Approaching client API rate limit!");
   *   // Consider delaying or reducing API calls
   * }
   * ```
   */
  isClientApproachingRateLimit(): boolean {
    return this.client?.isApproachingRateLimit() ?? false;
  }

  /**
   * Checks if application API is approaching its rate limit (less than 10% remaining).
   * 
   * @returns True if approaching rate limit, false otherwise
   * 
   * @example
   * ```ts
   * if (ptero.isAppApproachingRateLimit()) {
   *   console.warn("Approaching application API rate limit!");
   *   // Consider delaying or reducing API calls
   * }
   * ```
   */
  isAppApproachingRateLimit(): boolean {
    return this.app?.isApproachingRateLimit() ?? false;
  }
}