import { PteroApp } from "../../core/client.js";
import {
  NodeIdRequest,
  NodeConfig,
} from "../../types/nodes/nodes.js";

export async function fetchConfiguration(
  client: PteroApp,
  data: NodeIdRequest
): Promise<NodeConfig> {

  const http = await client.http();

  const response = await http.get<NodeConfig>(
    `/application/nodes/${data.id}/configuration`
  );
  return response.data;
}
