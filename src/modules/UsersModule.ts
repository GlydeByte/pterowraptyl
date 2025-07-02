import { PteroApp } from "../core/client.js";
import { IncludeParameters, SortParameters, FilterParameters } from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { UsersList } from "../types/users/users.js"
import { fetchAll } from "./users/fetchAll.js";
/**
 * Module for accessing Pterodactyl users endpoints.
 * This module provides methods to access user details, create users, update users, etc.
 */
export class UsersModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

   fetchAll(
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    sort?: SortParameters,
    pagination?: PaginationOptions
  ): Promise<UsersList> {
    return fetchAll(this.client, include, filter, sort, pagination);
  } 
}
