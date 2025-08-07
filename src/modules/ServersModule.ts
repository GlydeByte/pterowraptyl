import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { fetchAll } from "./app/servers/fetchAll.js";
import { fetchOne } from "./app/servers/fetchOne.js";
import { ServerAttributes, ServerIdRequest } from "../types/servers/servers.js";


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
}
