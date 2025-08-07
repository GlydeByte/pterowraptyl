import { PteroApp } from "../../../core/client.js";
import { CreateServerRequest, Server } from "../../../types/servers/servers.js";

export async function createServer(
  client: PteroApp,
  data: CreateServerRequest
): Promise<Server> {
  const http = await client.http();
  const response = await http.post<Server>("/application/servers", data);
  return response.data;
}
