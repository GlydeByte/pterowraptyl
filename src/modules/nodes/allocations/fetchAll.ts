import { PteroApp } from "../../../core/client.js";
import { PaginationOptions } from "../../../types/common.js";
import { NodeIdRequest, AllocationResponse } from "../../../types/nodes/nodes.js";
import { AllocationAttributes } from "../../../types/servers/servers.js";
import { paginationBuilder } from "../../../utils/builders.js";

export async function fetchAllocations(
  client: PteroApp,
  data: NodeIdRequest,
  pagination?: PaginationOptions
): Promise<AllocationAttributes[]> {
  const http = await client.http();
  const paginationString = paginationBuilder(pagination);

  const response = await http.get<AllocationResponse>(
    `/application/nodes/${data.id}/allocations${paginationString}`
  );

  return response.data.data.map(allocation => allocation.attributes);
}
