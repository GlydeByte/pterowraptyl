import { PteroApp } from "../core/client.js";

import { fetchAll } from "./nodes/fetchAll.js";
import { NodeAttributes, NodeIdRequest } from "../types/nodes/nodes.js";
import { IncludeParameters } from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
/**
 * Module for accessing Pterodactyl nodes endpoints.
 * This module provides methods to access node details, create nodes, update nodes, etc.
 */
export class NodesModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

  /**
   * Fetches all nodes with optional include parameters and pagination.
   * @param include - Include parameters to specify related resources to include in the response.
   * Allowed values are IncludeParameters.SERVERS, IncludeParameters.ALLOCATIONS, and IncludeParameters.LOCATION.
   * If not provided, no related resources are included.
   * @param pagination - Pagination options to control the number of results returned.
   * @example
   * ```ts
   * //fetching all nodes with all include parameters
   * const nodes = await ptero.nodes.fetchAll(["allocations", "servers", "location"]);
   * console.log("Nodes:", nodes);
   * ```
   * @returns {Promise<NodeAttributes[]>} - A promise that resolves to an array of node attributes. 
   */
  fetchAll(
    include?: IncludeParameters[],
    pagination?: PaginationOptions
  ): Promise<NodeAttributes[]> {
    return fetchAll(this.client, include, pagination);
  }
}
