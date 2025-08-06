import { PteroApp } from "../../../core/client.js";
import {
  UserRequest,
  UserAttributes,
  User,
} from "../../../types/users/users.js";

export async function createUser(
  client: PteroApp,
  data: UserRequest
): Promise<UserAttributes> {
  const http = await client.http();
  const response = await http.post<User>(
    `/application/users`,
    data
  );
  
  return response.data.attributes;
}