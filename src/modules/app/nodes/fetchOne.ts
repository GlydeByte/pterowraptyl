import { PteroApp } from "../../../core/client.js";
import {
  NodeIdRequest,
  NodeAttributes,
  Node,
} from "../../../types/nodes/nodes.js";
import { includeBuilder } from "../../../utils/builders.js";
import { IncludeParameters } from "../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: NodeIdRequest,
  include?: IncludeParameters[]
): Promise<NodeAttributes> {
  const includeString = includeBuilder(
    [
      IncludeParameters.SERVERS,
      IncludeParameters.LOCATION,
      IncludeParameters.ALLOCATIONS,
    ],
    include || []
  );
  const http = await client.http();

  const response = await http.get<Node>(
    `/application/nodes/${data.id}${includeString}`
  );
  return response.data.attributes;
}
