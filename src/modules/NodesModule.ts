import { PteroApp } from "../core/client.js";

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
}
