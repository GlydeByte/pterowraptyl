import { PteroApp } from "../../../core/client.js";
import {
  AllocationRequest,
} from "../../../types/nodes/nodes.js";
import { Allocation, AllocationAttributes } from "../../../types/servers/servers.js";

export async function createAllocation(
    client: PteroApp,
    data: AllocationRequest
): Promise<boolean> {
    const { id, ...payload } = data;
    const http = await client.http();
    const response = await http.post<Allocation>(
        `/application/nodes/${id}/allocations`,
        payload
    );
    
    if (response.status !== 204) {
        throw new Error("Failed to create allocation.");
    }

    return true;
}