import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../types/enums.js";


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

}
