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
  LocationAttributes,
  LocationsList
} from "../../../types/locations/locations.js";

export async function fetchAll(
  client: PteroApp,
  sort?: SortParameters,
  include?: IncludeParameters[],
  filter?: Record<FilterParameters, string>,
  pagination?: PaginationOptions
): Promise<LocationAttributes[]> {
  const includeString = includeBuilder(
    [
      IncludeParameters.NODES,
      IncludeParameters.SERVERS,
    ],
    include || []
  );

  const filterString = filterBuilder(
    [
      FilterParameters.SHORT,
      FilterParameters.LONG,
    ],
    filter || {}
  );

  const sortString = sortBuilder(
    [
      SortParameters.ID,
      SortParameters.SHORT,
      SortParameters.LONG,
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
  const response = await http.get<LocationsList>(
    `/application/locations${queryString}`
  );

  return response.data.data.map((location) => location.attributes);
}