import { PteroApp } from "../../../core/client.js";
import { PaginationOptions } from "../../../types/common.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../../../types/enums.js";
import {
  includeBuilder,
  filterBuilder,
  sortBuilder,
  paginationBuilder,
  queryBuilder,
} from "../../../utils/builders.js";
import {
  ServerAttributes,
  ServerListResponse
} from "../../../types/servers/servers.js";

export async function fetchAll(
  client: PteroApp,
  sort?: SortParameters,
  include?: IncludeParameters[],
  filter?: Record<FilterParameters, string>,
  pagination?: PaginationOptions
): Promise<ServerAttributes[]> {
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

  const filterString = filterBuilder(
    [
      FilterParameters.NAME,
      FilterParameters.UUID,
      FilterParameters.EXTERNAL_ID,
      FilterParameters.IMAGE,
    ],
    filter || {}
  );

  const sortString = sortBuilder(
    [
      SortParameters.ID,
      SortParameters.UUID,
      SortParameters.NAME,
      SortParameters.CREATED_AT,
      SortParameters.UPDATED_AT,
    ],
    sort || ""
  );

  const paginationString = paginationBuilder(pagination);
  const queryString = queryBuilder([
    includeString,
    filterString,
    sortString,
    paginationString,
  ]);

  const http = await client.http();
  const response = await http.get<ServerListResponse>(
    `/application/servers${queryString}`
  );

  return response.data.data.map((server) => server.attributes);
}
