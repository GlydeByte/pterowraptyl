import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { fetchAll } from "./app/servers/fetchAll.js";
import { fetchOne } from "./app/servers/fetchOne.js";
import { createServer } from "./app/servers/createServer.js";
import { deleteServer } from "./app/servers/deleteServer.js";
import {
  Server,
  ServerAttributes,
  ServerIdRequest,
  CreateServerRequest,
  ReinstallServerRequest,
} from "../types/servers/servers.js";
import { reinstallServer } from "./app/servers/reinstallServer.js";
import { unsuspendServer } from "./app/servers/unsuspendServer.js";
import { suspendServer } from "./app/servers/suspendServer.js";

/**
 * Module for accessing Pterodactyl servers endpoints.
 * This module provides methods to access server details, create servers, update servers, etc.
 */
export class ServersModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

  /**
   * Fetches a list of servers with optional sorting, filtering, and pagination.
   * @param sort - Optional sorting parameters.
   * @param include - Optional include parameters for related resources.
   * @param filter - Optional filtering parameters.
   * @param pagination - Optional pagination options.
   * @example
   * ```ts
   * const servers = await ptero.servers.fetchAll();
   * console.log(servers);
   * ```
   * @returns A promise that resolves to an array of server attributes.
   */
  fetchAll(
    sort?: SortParameters,
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    pagination?: PaginationOptions
  ): Promise<ServerAttributes[]> {
    return fetchAll(this.client, sort, include, filter, pagination);
  }

  /**
   * Fetches a single server by its ID.
   * @param data - The request data containing the server ID.
   * @param include - Optional include parameters for related resources.
   * @example
   * ```ts
   * const server = await ptero.servers.fetchOne({ id: 1 });
   * console.log(server);
   * ```
   * @returns A promise that resolves to the server attributes.
   */
  fetchOne(
    data: ServerIdRequest,
    include?: IncludeParameters[]
  ): Promise<ServerAttributes> {
    return fetchOne(this.client, data, include);
  }

  /**
   * Creates a new server with the provided data.
   * @param data - The request data for creating the server.
   * @example
   * ```ts
   * const newServer = await app.servers.create({
   *   name: "My New Server",
   *   user: 1,
   *   egg: 5,
   *   docker_image: "quay.io/pterodactyl/core:java",
   *   startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}",
   *   environment: {
   *     MINECRAFT_VERSION: "latest",
   *     SERVER_JARFILE: "server.jar",
   *     BUILD_NUMBER: "recommended"
   *   },
   *   limits: {
   *     memory: 1024,
   *     swap: 0,
   *     disk: 2048,
   *     io: 500,
   *     cpu: 100,
   *     oom_disabled: false
   *   },
   *   feature_limits: {
   *     databases: 2,
   *     allocations: 1,
   *     backups: 5
   *   },
   *   allocation: {
   *     default: 1
   *   }
   * });
   * ```
   * @returns A promise that resolves to the created server.
   */
  createServer(data: CreateServerRequest): Promise<Server> {
    return createServer(this.client, data);
  }

  /**
   * Deletes a server by its ID.
   * @param data - The request data containing the server ID.
   * @example
   * ```ts
   * const success = await ptero.servers.deleteServer({ id: 1 });
   * console.log(success ? "Server deleted successfully." : "Failed to delete server.");
   * ```
   * @returns A promise that resolves to a boolean indicating success.
   */
  deleteServer(data: ServerIdRequest): Promise<boolean> {
    return deleteServer(this.client, data);
  }

  /**
   * Reinstalls a server by its ID.
   * @param data - The request data containing the server ID and optional force flag.
   * @example
   * ```ts
   * const success = await ptero.servers.reinstallServer({ id: 1,
   * force: true });
   * ```
   * @returns A promise that resolves to the reinstalled server attributes.
   */
  reinstallServer(data: ReinstallServerRequest): Promise<boolean> {
    return reinstallServer(this.client, data);
  }

  /**
   * Suspends a server by its ID.
   * @param data - The request data containing the server ID.
   * @example
   * ```ts
   * const success = await ptero.servers.suspendServer({ id: 1 });
   * console.log(success ? "Server suspended successfully." : "Failed to suspend server.");
   * ```
   * @returns A promise that resolves to a boolean indicating success.
   */
  suspendServer(data: ServerIdRequest): Promise<boolean> {
    return suspendServer(this.client, data);
  }

  /**
   * Unsuspends a server by its ID.
   * @param data - The request data containing the server ID.
   * @example
   * ```ts
   * const success = await ptero.servers.unsuspendServer({ id: 1 });
   * console.log(success ? "Server unsuspended successfully." : "Failed to unsuspend server.");
   * ```
   * @returns A promise that resolves to a boolean indicating success.
   */
  unsuspendServer(data: ServerIdRequest): Promise<boolean> {
    return unsuspendServer(this.client, data);
  }
}
