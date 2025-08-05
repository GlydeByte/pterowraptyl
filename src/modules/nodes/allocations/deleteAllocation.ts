import { PteroApp } from "../../../core/client.js";
import { AllocationDeleteRequest } from "../../../types/nodes/nodes.js";

export async function deleteAllocation(
  client: PteroApp,
  data: AllocationDeleteRequest
): Promise<boolean> {
  if (!data.id) {
    throw new Error("Node ID is required to delete a node.");
  }
  const http = await client.http();
  const response = await http.delete<void>(`/application/nodes/${data.id}/allocations/${data.allocation_id}`);
  if (response.status !== 204) {
    throw new Error("Failed to delete allocation.");
  } else {
    return true;
  }

}
