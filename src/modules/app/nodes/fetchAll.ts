import { PteroApp } from "../../../core/client.js";
import {
  IncludeParameters
} from "../../../types/enums.js";
import { PaginationOptions } from "../../../types/common.js";
import { NodeAttributes, NodeResponse } from "../../../types/nodes/nodes.js";
import {
  includeBuilder,
  paginationBuilder,
  queryBuilder,
} from "../../../utils/builders.js";

export async function fetchAll(
  client: PteroApp,
  include?: IncludeParameters[],
  pagination?: PaginationOptions
): Promise<NodeAttributes[]> {
  const includeString = includeBuilder(
    [IncludeParameters.SERVERS, IncludeParameters.ALLOCATIONS, IncludeParameters.LOCATION],
    include || []
  );

  const paginationString = paginationBuilder(pagination);
  const queryString = queryBuilder([
    includeString,
    paginationString,
  ]);

  const http = await client.http();
  const response = await http.get<NodeResponse>(`/application/nodes/${queryString}`);

  return response.data.data.map(user => user.attributes);
}