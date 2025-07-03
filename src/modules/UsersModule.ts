import { PteroApp } from "../core/client.js";
import {
  IncludeParameters,
  SortParameters,
  FilterParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";
import { UserAttributes, UserIdRequest, UserRequest } from "../types/users/users.js";
import { fetchAll } from "./users/fetchAll.js";
import { fetchOne } from "./users/fetchOne.js";
import { createUser } from "./users/createUser.js";
import { updateUser } from "./users/updateUser.js";
import { deleteUser } from "./users/deleteUser.js";


/**
 * The `UsersModule` class provides methods for managing users in the Pterodactyl application.
 * It allows you to fetch, create, update, and delete users, as well as apply sorting, filtering,
 * and pagination to user queries.
 *
 * @module UsersModule
 * @remarks
 * This module is designed to interact with the Pterodactyl API via a provided `PteroApp` client instance.
 * All methods return Promises and are intended for asynchronous usage.
 *
 * @example
 * ```ts
 * const usersModule = new UsersModule(pteroAppClient);
 * const users = await usersModule.fetchAll();
 * const user = await usersModule.fetchOne({ id: 1 });
 * const newUser = await usersModule.createUser({ ... });
 * const updatedUser = await usersModule.updateUser({ ... });
 * const deleted = await usersModule.deleteUser({ id: 1 });
 * ```
 *
 * @see {@link https://pterodactyl.io/} for more information about the Pterodactyl API.
 *
 * @public
 */
export class UsersModule {
  constructor(private client: PteroApp) {
    if (!this.client) {
      throw new Error("PteroApp is required.");
    }
  }

  /**
   * Fetches all users with optional sorting, filtering, and pagination.
   * @param sort - Sorting parameters to apply to the results.
   * Allowed values are SortParameters.ID and SortParameters.UUID.
   * If not provided, no sorting is applied.
   * @param include - Include parameters to specify related resources to include in the response.
   * Allowed values are IncludeParameters.SERVERS.
   * If not provided, no related resources are included.
   * @param filter  - Filter parameters to apply to the results.
   * Allowed values are FilterParameters.EMAIL, FilterParameters.EXTERNAL_ID,
   * FilterParameters.USERNAME, and FilterParameters.UUID.
   * If not provided, no filtering is applied.
   * @param pagination - Pagination options to control the number of results returned.
   * If not provided, all results are returned.
   * @example
   * ```ts
   * const users = await ptero.users.fetchAll(
   *  "id", // sorting field
   *   ["servers"], // include field
   *   { uuid: "30591422-fa31-4991-9265-28a30fb033c4", username: "rudo" }, // using available filters
   *   { page: 1, per_page: 2 } // pagination options
   * );
   * console.log(users);
   * ```
   * @returns {Promise<UserAttributes[]>} - A promise that resolves to an array of user attributes.
   *
   */
  fetchAll(
    sort?: SortParameters,
    include?: IncludeParameters[],
    filter?: Record<FilterParameters, string>,
    pagination?: PaginationOptions
  ): Promise<UserAttributes[]> {
    return fetchAll(this.client, sort, include, filter, pagination);
  }

  /**
   * 
   * @param data - UserIdRequest containing either id or external_id of the user to fetch.
   * If both are provided, id will be used.
   * If neither is provided, an error will be thrown.
   * @param include - Include parameters to specify related resources to include in the response.
   * Allowed values are IncludeParameters.SERVERS.
   * If not provided, no related resources are included.
   * @example
   * ```ts
   * const user = await ptero.users.fetchOne({ id: 1 });
   * console.log(user);
   *
   * const userWithExternalId = await ptero.users.fetchOne({ external_id: "remoteId1" });
   * console.log(userWithExternalId);
   * @returns {Promise<UserAttributes>} - A promise that resolves to the user attributes.
   * 
   */
  fetchOne(
    data: UserIdRequest,
    include?: IncludeParameters[]
  ): Promise<UserAttributes> {
    return fetchOne(this.client, data, include);
  }

  /**
   * 
   * @param data - UserRequest containing user details to create a new user.
   * The email, username, first_name, and last_name fields are required.
   * The password field is optional but recommended.
   * If external_id is provided, it will be used as the user's external identifier.
   * The root_admin field is optional and defaults to false.
   * @example
   * ```ts
   * const newUser = await ptero.users.createUser({
   *   username: "ExampleUser",
   *   email: "example@example.com",
   *   first_name: "Example",
   *   last_name: "Example",
   *   password: "Example123*",
   *   external_id: "ExampleExternalID",
   *   root_admin: false,
   * });
   * console.log("New User Created:", newUser);
   * ```
   * @returns {Promise<UserAttributes>} - A promise that resolves to the created user's attributes.
   */
  createUser(
    data: UserRequest
  ): Promise<UserAttributes> {
    return createUser(this.client, data);
  }


  /**
   * Updates a user's information using the provided user data.
   */
  updateUser(
    data: UserRequest
  ): Promise<UserAttributes> {
    return updateUser(this.client, data);
  }
  

  /**
   * Deletes a user by their ID.
   * This method will permanently remove the user from the system.
   * * @example
   * ```ts
   * const deletedUser = await ptero.users.deleteUser({ id: "7" });
   * console.log("Deleted User:", deletedUser);
   * ```
   * @param data - UserIdRequest containing the id of the user to delete.
   * If the id is not provided, an error will be thrown.
   * @returns {Promise<boolean>} - A promise that resolves to true if the user was successfully deleted.
   * If the user could not be deleted, it will throw an error.
   */
  deleteUser(
    data: UserIdRequest
  ): Promise<boolean> {
    return deleteUser(this.client, data);
  }
}
