import { PteroClient } from "../core/client.js";
import {
  IdentifierRequest,
  Server,
  Websocket,
  ServerResources
} from "../types/servers/servers.js";
import { getServer } from "./servers/getServer.js";
import { IncludeParameters } from "../types/enums.js";
import { getWebsocket } from "./servers/getWebsocket.js";
import { getUsage } from "./servers/getUsage.js";

export class ClientServersModule {
  constructor(private client: PteroClient) {
    if (!this.client) {
      throw new Error("PteroClient is required.");
    }
  }

  /**
   * Retrieves the details of a specific server by its identifier.
   * @param data - The server request data containing the identifier of the server to retrieve.
   * @returns {Promise<Server>} - A promise that resolves to the server details.
   * @example
   * ```ts
   * const server = await ptero.servers.getServer({ identifier: "server-identifier" }, [IncludeParameters.EGG, IncludeParameters.SUBUSERS]);
   * console.log(server);
   * ```
   */
  getServer(
    data: IdentifierRequest,
    include?: IncludeParameters[]
  ): Promise<Server> {
    return getServer(this.client, data, include);
  }

  /**
     * 
     * @param data - The request data containing the identifier of the server to retrieve the websocket for.
     * @example
     * ```ts
     * const socket = await ptero.servers.getWebsocket({identifier: "1b76beeb"});
       console.log(socket);
     * ```
     * @returns {Promise<Websocket>} - A promise that resolves to the websocket details for the specified server.
     */
  getWebsocket(data: IdentifierRequest): Promise<Websocket> {
    return getWebsocket(this.client, data);
  }
  /**
   * Retrieves the resource usage statistics for a specific server.
   * This includes memory, CPU, disk, and network usage.
   * @param data - The request data containing the identifier of the server to retrieve usage statistics for.
   * @example
   * ```ts
   * const usage = await ptero.servers.getUsage({ identifier: "server-identifier" });
   * console.log(usage);
   * ```
   * @returns {Promise<ServerResources>} - A promise that resolves to the resource usage statistics of the specified server.
   * 
   */
  getUsage(data: IdentifierRequest): Promise<ServerResources> {
    return getUsage(this.client, data);
  };
}
