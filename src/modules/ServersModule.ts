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
import { Server, ServerAttributes, ServerIdRequest, CreateServerRequest } from "../types/servers/servers.js";


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
   * @returns A promise that resolves to an array of server attributes.
   */
  fetchAll(
    sort?: SortParameters,
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    pagination?: PaginationOptions
  ): Promise<ServerAttributes[]> {
    return fetchAll(
      this.client,
      sort,
      include,
      filter,
      pagination
    );
  }

  /**
   * Fetches a single server by its ID.
   * @param data - The request data containing the server ID.
   * @param include - Optional include parameters for related resources.
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
   * @returns A promise that resolves to the created server.
   */
  createServer(
    data: CreateServerRequest
  ): Promise<Server> {
    return createServer(this.client, data);
  }

  /**
   * Deletes a server by its ID.
   * @param data - The request data containing the server ID.
   * @returns A promise that resolves to a boolean indicating success.
   */
  deleteServer(
    data: ServerIdRequest
  ): Promise<boolean> {
    return deleteServer(this.client, data);
  }
}
