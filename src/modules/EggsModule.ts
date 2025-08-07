import { PteroApp } from "../core/client.js";
import { PaginationOptions } from "../types/common.js";
import { IncludeParameters } from "../types/enums.js";
import { fetchAll } from "./app/nests/eggs/fetchAll.js";
import {
  EggAttributes,
  NestEggRequest,
  NestIdRequest,
} from "../types/nests/nests.js";
import { fetchOne } from "./app/nests/eggs/fetchOne.js";

/**
 * Module for accessing Pterodactyl eggs endpoints.
 * This module provides methods to access egg details, create eggs, update eggs, etc.
 */
export class EggsModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

  /**
   * Fetches a list of eggs within a specific nest.
   * @param data - The request data containing the nest ID.
   * @param include - Optional include parameters for related resources.
   * @param pagination - Optional pagination options.
   * @example
   * ```ts
   * const eggs = await ptero.eggs.fetchAll({ id: 1 });
   * console.log(eggs);
   * ```
   * @returns A promise that resolves to an array of egg attributes.
   */
  fetchAll(
    data: NestIdRequest,
    include?: IncludeParameters[],
    pagination?: PaginationOptions
  ): Promise<EggAttributes[]> {
    return fetchAll(this.client, data, include, pagination);
  }


  /**
   * Fetches a single egg by its ID within a specific nest.
   * @param data - The request data containing the nest ID and egg ID.
   * @param include - Optional include parameters for related resources.
   * @example
   * ```ts
   * const egg = await ptero.eggs.fetchOne({ nestId: 1, eggId: 1 });
   * console.log(egg);
   * ```
   * @returns A promise that resolves to the egg attributes.
   */
  fetchOne(
    data: NestEggRequest,
    include?: IncludeParameters[]
  ): Promise<EggAttributes> {
    return fetchOne(this.client, data, include);
  }
}