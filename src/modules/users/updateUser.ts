import { PteroApp } from "../../core/client.js";
import {
  UserUpdateRequest,
  User,
  UserAttributes,
} from "../../types/users/users.js";

export async function updateUser(
  client: PteroApp,
  data: UserUpdateRequest
): Promise<UserAttributes> {
  const { id, ...updateData } = data;
  const http = await client.http();
  const response = await http.patch<User>(
    `/application/users/${id}`,
    updateData
  );
  
  return response.data.attributes;
}