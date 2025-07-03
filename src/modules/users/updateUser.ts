import { PteroApp } from "../../core/client.js";
import {
  UserRequest,
  UserAttributes,
  User,
} from "../../types/users/users.js";

export async function updateUser(
  client: PteroApp,
  data: UserRequest
): Promise<UserAttributes> {
  const http = await client.http();
  const response = await http.patch<User>(
    `/application/users`,
    data
  );
  
  return response.data.attributes;
}