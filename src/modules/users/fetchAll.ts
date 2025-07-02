import { PteroApp } from "../../core/client.js";
import {
  IncludeParameters,
  FilterParameters,
  SortParameters,
} from "../../types/enums.js";
import { PaginationOptions } from "../../types/common.js";
import { UsersList } from "../../types/users/users.js";
import { includeBuilder } from "../../utils/includeBuilder.js";
import { filterBuilder } from "../../utils/filterBuilder.js";
import { sortBuilder } from "../../utils/sortBuilder.js";

export async function fetchAll(
  client: PteroApp,
  include?: IncludeParameters[],
  filter?: Record<FilterParameters, string>,
  sort?: SortParameters,
  pagination?: PaginationOptions
): Promise<UsersList> {
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
  const sortString = sortBuilder([
    SortParameters.ID,
    SortParameters.UUID
  ], sort || "")
}
