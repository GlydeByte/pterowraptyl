import { PteroApp } from "../../../core/client.js";
import { ServerIdRequest } from "../../../types/servers/servers.js";

export async function suspendServer(
  client: PteroApp,
  data: ServerIdRequest
): Promise<boolean> {
  const http = await client.http();
  const response = await http.post<void>(
    "/application/servers/" + data.id + "/suspend"
  );

  if (response.status !== 204) {
    throw new Error("Failed to suspend server.");
  }
  return true;
}
