import { PteroApp } from "../../../core/client.js";
import { PaginationOptions } from "../../../types/common.js";
import {
  IncludeParameters,
} from "../../../types/enums.js";
import {
  includeBuilder,
  paginationBuilder,
  queryBuilder,
} from "../../../utils/builders.js";
import {
  NestAttributes,
  NestsList
} from "../../../types/nests/nests.js";

export async function fetchAll(
  client: PteroApp,
  include?: IncludeParameters[],
  pagination?: PaginationOptions
): Promise<NestAttributes[]> {
  const includeString = includeBuilder(
    [
      IncludeParameters.EGGS,
      IncludeParameters.SERVERS,
    ],
    include || []
  );

  const paginationString = paginationBuilder(pagination);
  const queryString = queryBuilder([
    includeString,
    paginationString,
  ]);

  const http = await client.http();
  const response = await http.get<NestsList>(
    `/application/nests${queryString}`
  );

  return response.data.data.map((nest) => nest.attributes);
}