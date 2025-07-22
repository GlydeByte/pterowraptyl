import { PteroApp } from "../../core/client.js";
import {
  NodeUpdateRequest,
  Node,
  NodeAttributes,
} from "../../types/nodes/nodes.js";

export async function updateNode(
  client: PteroApp,
  data: NodeUpdateRequest
): Promise<NodeAttributes> {
  const { id, ...updateData } = data;
  console.log(updateData);
  const http = await client.http();
  const response = await http.patch<Node>(
    `/application/nodes/${id}`,
    updateData
  );
  
  return response.data.attributes;
}