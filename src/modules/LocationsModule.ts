import { PteroApp } from "../core/client.js";
import { PaginationOptions } from "../types/common.js";
import {
  FilterParameters,
  IncludeParameters,
  SortParameters,
} from "../types/enums.js";
import {
  CreateLocationRequest,
  LocationAttributes,
  LocationIdRequest,
  Location,
  LocationUpdateRequest
} from "../types/locations/locations.js";
import { createLocation } from "./app/locations/createLocation.js";
import { deleteLocation } from "./app/locations/deleteLocation.js";
import { fetchAll } from "./app/locations/fetchAll.js";
import { fetchOne } from "./app/locations/fetchOne.js";
import { updateLocation } from "./app/locations/updateLocation.js";

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

  /**
   * Fetches a list of locations with optional sorting, filtering, and pagination.
   * @param sort - Optional sorting parameters.
   * @param include - Optional include parameters for related resources.
   * @param filter - Optional filtering parameters.
   * @param pagination - Optional pagination options.
   * @example
   * ```ts
   * const locations = await ptero.locations.fetchAll();
   * console.log(locations);
   * ```
   * @returns A promise that resolves to an array of location attributes.
   */
  fetchAll(
    sort?: SortParameters,
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    pagination?: PaginationOptions
  ): Promise<LocationAttributes[]> {
    return fetchAll(this.client, sort, include, filter, pagination);
  }

  /**
   * Fetches a single location by its ID.
   * @param data - The request data containing the location ID.
   * @param include - Optional include parameters for related resources.
   * @example
   * ```ts
   * const location = await ptero.locations.fetchOne({ id: 1 });
   * console.log(location);
   * ```
   * @returns A promise that resolves to the location attributes.
   */
  fetchOne(
    data: LocationIdRequest,
    include?: IncludeParameters[]
  ): Promise<LocationAttributes> {
    return fetchOne(this.client, data, include);
  }

  /**
   * Creates a new location with the provided data.
   * @param data - The request data for creating the location.
   * @example
   * ```ts
   * const newLocation = await ptero.locations.createLocation({
   *   short: "ap-south",
   *   long: "Asia Pacific South"
   * });
   * console.log(newLocation);
   * ```
   * @returns A promise that resolves to the created location.
   */
  createLocation(data: CreateLocationRequest): Promise<Location> {
    return createLocation(this.client, data);
  }

  /**
   * Updates an existing location with the provided data.
   * @param data - The request data for updating the location.
   * @example
   * ```ts
   * const updatedLocation = await ptero.locations.updateLocation({
   *   id: 3,
   *   short: "apac-south",
   *   long: "Asia Pacific South Region"
   * });
   * console.log(updatedLocation);
   * ```
   * @returns A promise that resolves to the updated location attributes.
   */
  updateLocation(data: LocationUpdateRequest): Promise<LocationAttributes> {
    return updateLocation(this.client, data);
  }

  /**
   * Deletes a location from the panel. This action is irreversible.
   * Note: A location can only be deleted if it has no associated nodes.
   * @param data - The request data containing the location ID.
   * @example
   * ```ts
   * const deleted = await ptero.locations.deleteLocation({ id: 3 });
   * console.log(deleted); // true
   * ```
   * @returns A promise that resolves to true if the location was successfully deleted.
   * @throws Will throw an error if the location has associated nodes or if deletion fails.
   */
  deleteLocation(data: LocationIdRequest): Promise<boolean> {
    return deleteLocation(this.client, data);
  }
}
