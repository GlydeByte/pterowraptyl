import { PteroApp } from "../core/client.js";

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
}
