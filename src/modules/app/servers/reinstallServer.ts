import { PteroApp } from "../../../core/client.js";
import { ReinstallServerRequest } from "../../../types/servers/servers.js";

export async function reinstallServer(
  client: PteroApp,
  data: ReinstallServerRequest
): Promise<boolean> {
  const http = await client.http();
  const forceString = data.force ? "?force=true" : "";
  const response = await http.post<void>(
    "/application/servers/" + data.id + "/reinstall" + forceString
  );

  if (response.status !== 204) {
    throw new Error("Failed to reinstall server.");
  }
  return true;
}
