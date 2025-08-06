import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { fetchAll } from "./app/servers/fetchAll.js";
import { ServerAttributes } from "../types/servers/servers.js";


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

}
