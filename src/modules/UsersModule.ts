import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  SortParameters,
  FilterParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { UserAttributes } from "../types/users/users.js";
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

  /**
   * Fetches all users with optional sorting, filtering, and pagination.
   * @param sort - Sorting parameters to apply to the results.
   * Allowed values are SortParameters.ID and SortParameters.UUID.
   * If not provided, no sorting is applied.
   * @param include - Include parameters to specify related resources to include in the response.
   * Allowed values are IncludeParameters.SERVERS.
   * If not provided, no related resources are included.
   * @param filter  - Filter parameters to apply to the results.
   * Allowed values are FilterParameters.EMAIL, FilterParameters.EXTERNAL_ID,
   * FilterParameters.USERNAME, and FilterParameters.UUID.
   * If not provided, no filtering is applied.
   * @param pagination - Pagination options to control the number of results returned.
   * If not provided, all results are returned.
   * @example
   * ```ts
   * const users = await ptero.users.fetchAll(
   *  "id", // sorting field
   *   ["servers"], // include field
   *   { uuid: "30591422-fa31-4991-9265-28a30fb033c4", username: "rudo" }, // using available filters
   *   { page: 1, per_page: 2 } // pagination options
   * );
   * console.log(users);
   * ```
   * @returns {Promise<UserAttributes[]>} - A promise that resolves to an array of user attributes. 
   * 
   */
  fetchAll(
    sort?: SortParameters,
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    pagination?: PaginationOptions
  ): Promise<UserAttributes[]> {
    return fetchAll(this.client, sort, include, filter, pagination);
  }
}
