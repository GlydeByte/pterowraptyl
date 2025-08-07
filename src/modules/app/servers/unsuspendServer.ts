import { PteroApp } from "../../../core/client.js";
import { ServerIdRequest } from "../../../types/servers/servers.js";

export async function unsuspendServer(
  client: PteroApp,
  data: ServerIdRequest
): Promise<boolean> {
  const http = await client.http();
  const response = await http.post<void>(
    "/application/servers/" + data.id + "/unsuspend"
  );

  if (response.status !== 204) {
    throw new Error("Failed to unsuspend server.");
  }
  return true;
}
