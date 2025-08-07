import { PteroApp } from "../../../core/client.js";
import {
  ServerUpdateRequest,
  Server,
  ServerAttributes,
} from "../../../types/servers/servers.js";

export async function updateServer(
  client: PteroApp,
  data: ServerUpdateRequest
): Promise<ServerAttributes> {
  const { id, ...updateData } = data;
  const http = await client.http();
  const response = await http.patch<Server>(
    `/application/servers/${id}/details`,
    updateData
  );
  return response.data.attributes;
}
