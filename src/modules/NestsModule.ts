import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  SortParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { fetchAll } from "./app/nests/fetchAll.js";
import {
  NestAttributes,
  NestIdRequest,
} from "../types/nests/nests.js";
import { fetchOne } from "./app/nests/fetchOne.js";

/**
 * Module for accessing Pterodactyl nests endpoints.
 * This module provides methods to access nest details, create nests, update nests, etc.
 */
export class NestsModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

  /**
   * Fetches a list of nests with optional sorting and pagination.
   * @param include - Optional include parameters for related resources.
   * @param pagination - Optional pagination options.
   * @example
   * ```ts
   * const nests = await ptero.nests.fetchAll();
   * console.log(nests);
   * ```
   * @returns A promise that resolves to an array of nest attributes.
   */
  fetchAll(
    include?: IncludeParameters[],
    pagination?: PaginationOptions
  ): Promise<NestAttributes[]> {
    return fetchAll(this.client, include, pagination);
  }

  /**
   * Fetches a single nest by its ID.
   * @param data - The request data containing the nest ID.
   * @param include - Optional include parameters for related resources.
   * @example
   * ```ts
   * const nest = await ptero.nests.fetchOne({ id: 1 });
   * console.log(nest);
   * ```
   * @returns A promise that resolves to the nest attributes.
   */
  fetchOne(
    data: NestIdRequest,
    include?: IncludeParameters[]
  ): Promise<NestAttributes> {
    return fetchOne(this.client, data, include);
  }
}