import { PteroApp } from "../../../core/client.js";
import {
  ServerStartupUpdateRequest,
  Server,
  ServerAttributes,
} from "../../../types/servers/servers.js";

export async function updateServerStartup(
  client: PteroApp,
  data: ServerStartupUpdateRequest
): Promise<ServerAttributes> {
  const { id, ...updateData } = data;
  const http = await client.http();
  const response = await http.patch<Server>(
    `/application/servers/${id}/startup`,
    updateData
  );
  return response.data.attributes;
}