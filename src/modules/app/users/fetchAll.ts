import { PteroApp } from "../../../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../../../types/enums.js";
import { PaginationOptions } from "../../../types/common.js";
import { UserAttributes, UsersResponse } from "../../../types/users/users.js";
import {
  includeBuilder,
  filterBuilder,
  sortBuilder,
  paginationBuilder,
  queryBuilder,
} from "../../../utils/builders.js";

export async function fetchAll(
  client: PteroApp,
  sort?: SortParameters,
  include?: IncludeParameters[],
  filter?: Record<FilterParameters, string>,
  pagination?: PaginationOptions
): Promise<UserAttributes[]> {
  const includeString = includeBuilder(
    [IncludeParameters.SERVERS],
    include || []
  );
  const filterString = filterBuilder(
    [
      FilterParameters.EMAIL,
      FilterParameters.EXTERNAL_ID,
      FilterParameters.USERNAME,
      FilterParameters.UUID,
    ],
    filter || {}
  );
  const sortString = sortBuilder(
    [SortParameters.ID, SortParameters.UUID],
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
  const response = await http.get<UsersResponse>(`/application/users/${queryString}`);

  return response.data.data.map(user => user.attributes);
}