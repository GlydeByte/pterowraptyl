import { PteroApp } from "../core/client.js";


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
    
};