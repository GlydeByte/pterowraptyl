import { PteroApp } from "../../core/client.js";
import { NodeIdRequest } from "../../types/nodes/nodes.js";

export async function deleteNode(
  client: PteroApp,
  data: NodeIdRequest
): Promise<boolean> {
  if (!data.id) {
    throw new Error("Node ID is required to delete a node.");
  }
  const http = await client.http();
  await http.delete<void>(`/application/nodes/${data.id}`);

  return true;
}
