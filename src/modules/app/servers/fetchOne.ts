import { PteroApp } from "../../../core/client.js";
import {
  ServerIdRequest,
  ServerAttributes,
  Server,
} from "../../../types/servers/servers.js";
import { includeBuilder } from "../../../utils/builders.js";
import { IncludeParameters } from "../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: ServerIdRequest,
  include?: IncludeParameters[]
): Promise<ServerAttributes> {
  const includeString = includeBuilder(
    [
      IncludeParameters.ALLOCATIONS,
      IncludeParameters.USER,
      IncludeParameters.SUBUSERS,
      IncludeParameters.PACK,
      IncludeParameters.NEST,
      IncludeParameters.EGG,
      IncludeParameters.VARIABLES,
      IncludeParameters.LOCATION,
      IncludeParameters.NODE,
      IncludeParameters.DATABASES,
      IncludeParameters.BACKUPS,
    ],
    include || []
  );
  const http = await client.http();

  const response = await http.get<Server>(
    `/application/servers/${data.id}${includeString}`
  );
  return response.data.attributes;
}
