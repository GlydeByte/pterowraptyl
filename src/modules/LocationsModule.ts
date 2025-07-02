import { PteroApp } from "../core/client.js";

/**
 * Module for accessing Pterodactyl locations endpoints.
 * This module provides methods to access location details, create locations, update locations, etc.
 */
export class LocationsModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }
}
