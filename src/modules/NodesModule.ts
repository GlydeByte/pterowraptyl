import { PteroApp } from "../core/client.js";

import { fetchAll } from "./nodes/fetchAll.js";
import { fetchOne } from "./nodes/fetchOne.js";
import { fetchConfiguration } from "./nodes/fetchConfiguration.js";
import { createNode } from "./nodes/createNode.js";
import { updateNode } from "./nodes/updateNode.js";
import { deleteNode } from "./nodes/deleteNode.js";

import { NodeAttributes, NodeUpdateRequest, NodeConfig, NodeIdRequest } from "../types/nodes/nodes.js";
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

  /**
   * Fetches a single node by its ID with optional include parameters.
   * @param data - The request object containing the node ID.
   * @param include - Include parameters to specify related resources to include in the response.
   * Allowed values are IncludeParameters.SERVERS, IncludeParameters.ALLOCATIONS, and IncludeParameters.LOCATION.
   * If not provided, no related resources are included.
   * @example
   * ```ts
   * //fetching a single node by its ID with all include parameters
   * const node = await ptero.nodes.fetchOne({ id: "node-id" },
   * ["allocations", "servers", "location"]);
   * console.log("Node:", node);
   * ```
   * @returns {Promise<NodeAttributes>} - A promise that resolves to the attributes of the requested node. 
   */
  fetchOne(
    data: NodeIdRequest,
    include?: IncludeParameters[]
  ): Promise<NodeAttributes> {
    return fetchOne(this.client, data, include);
  }

  /**
   * Fetches the configuration of a node by its ID.
   * @param data - The request object containing the node ID.
   * @example
   * ```ts
   * // fetching config of node 1
   * const config = await ptero.nodes.fetchConfiguration({id: 1});
   * console.log("Node 1 Configuration:", config);
   * ```
   * @returns {Promise<NodeConfig>} - A promise that resolves to the configuration of the requested node.
   */
  fetchConfiguration(data: NodeIdRequest): Promise<NodeConfig> {
    return fetchConfiguration(this.client, data);
  }

  /**
   * Creates a new node with the specified attributes.
   * This method allows you to create a new node in the Pterodactyl panel
   * @param data - The attributes of the node to create.
   * This should include all required fields as per the Pterodactyl API documentation.
   * @example
   * ```ts
   * const newNode = await ptero.nodes.createNode({
   *    name: "New Node",
   *     location_id: 1,
   *     fqdn: "node2.example.com",
   *     scheme: "https",
   *     memory: 10240,
   *     memory_overallocate: 0,
   *     disk: 50000,
   *     disk_overallocate: 0,
   *     upload_size: 100,
   *     daemon_sftp: 2022,
   *     daemon_listen: 8080,
   * });
   * console.log("New Node Created:", newNode);
   * ```
   * @returns {Promise<NodeAttributes>} - A promise that resolves to the attributes of the created node. 
   */
  createNode(
    data: NodeAttributes
  ): Promise<NodeAttributes> {
    return createNode(this.client, data);
  }

  /**
   * Updates an existing node with the specified attributes.
   * @param data - The request object containing the node ID and attributes to update.
   * @example
   * ```ts
   * const updatedNode = await ptero.nodes.updateNode({
   *     id: 1,
   *     name: "Updated Node Name",
   *     description: "Updated description for the node.",
   * });
   * console.log("Node Updated:", updatedNode);
   * ```
   * @returns {Promise<NodeAttributes>} - A promise that resolves to the updated attributes of the node. 
   */
  updateNode(
    data: NodeUpdateRequest
  ): Promise<NodeAttributes> {
    return updateNode(this.client, data);
  }

  /**
   * Deletes a node by its ID.
   * @param data - The request object containing the node ID to delete.
   * @example
   * ```ts
   * //deleting a node by its ID
   * const isDeleted = await ptero.nodes.deleteNode({ id: "node-id" });
   * console.log("Node Deleted:", isDeleted);
   * ```
   * @returns {Promise<boolean>} - A promise that resolves to true if the node was successfully deleted, otherwise false.
   */
  deleteNode(
    data: NodeIdRequest
  ): Promise<boolean> {
    return deleteNode(this.client, data);
  }

}
