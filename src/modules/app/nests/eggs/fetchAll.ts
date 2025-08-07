import { PteroApp } from "../../../../core/client.js";
import { PaginationOptions } from "../../../../types/common.js";
import {
  IncludeParameters,
} from "../../../../types/enums.js";
import {
  includeBuilder,
  paginationBuilder,
  queryBuilder,
} from "../../../../utils/builders.js";
import {
  EggAttributes,
  EggsList,
  NestIdRequest
} from "../../../../types/nests/nests.js";

export async function fetchAll(
  client: PteroApp,
  data: NestIdRequest,
  include?: IncludeParameters[],
  pagination?: PaginationOptions
): Promise<EggAttributes[]> {
  const includeString = includeBuilder(
    [
      IncludeParameters.VARIABLES,
      IncludeParameters.NEST,
    ],
    include || []
  );

  const paginationString = paginationBuilder(pagination);
  const queryString = queryBuilder([
    includeString,
    paginationString,
  ]);

  const http = await client.http();
  const response = await http.get<EggsList>(
    `/application/nests/${data.id}/eggs${queryString}`
  );

  return response.data.data.map((egg) => egg.attributes);
}