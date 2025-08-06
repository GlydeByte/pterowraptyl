import { PteroApp } from "../../../core/client.js";
import {
  NodeRequest,
  NodeAttributes,
  Node,
} from "../../../types/nodes/nodes.js";

export async function createNode(
  client: PteroApp,
  data: NodeRequest
): Promise<NodeAttributes> {
  const http = await client.http();
  const response = await http.post<Node>(
    `/application/nodes`,
    data
  );
  
  return response.data.attributes;
}