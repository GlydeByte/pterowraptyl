import { PteroApp } from "../../../core/client.js";
import { ServerIdRequest } from "../../../types/servers/servers.js";

export async function deleteServer(
  client: PteroApp,
  data: ServerIdRequest
): Promise<boolean> {
  if (!data.id) {
    throw new Error("Server ID is required to delete a server.");
  }
  const http = await client.http();
  const response = await http.delete<void>(`/application/servers/${data.id}`);

  if (response.status !== 204) {
    throw new Error("Failed to delete server.");
  }

  return true;
}
