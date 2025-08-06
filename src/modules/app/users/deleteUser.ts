import { PteroApp } from "../../../core/client.js";
import { UserIdRequest, User } from "../../../types/users/users.js";

export async function deleteUser(
  client: PteroApp,
  data: UserIdRequest
): Promise<boolean> {
  if (!data.id) {
    throw new Error("User ID is required to delete a user.");
  }
  const http = await client.http();
  const response = await http.delete<void>(`/application/users/${data.id}`);

  if (response.status !== 204) {
    throw new Error("Failed to delete user.");
  }

  return true;
}
