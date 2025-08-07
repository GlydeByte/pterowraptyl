import { PteroApp } from "../../../core/client.js";
import {
  ServerBuildUpdateRequest,
  Server,
  ServerAttributes,
} from "../../../types/servers/servers.js";

export async function updateServerBuild(
  client: PteroApp,
  data: ServerBuildUpdateRequest
): Promise<ServerAttributes> {
  const { id, ...updateData } = data;
  const http = await client.http();
  const response = await http.patch<Server>(
    `/application/servers/${id}/build`,
    updateData
  );
  return response.data.attributes;
}