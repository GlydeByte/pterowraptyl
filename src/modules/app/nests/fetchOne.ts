import { PteroApp } from "../../../core/client.js";
import {
  NestIdRequest,
  NestAttributes,
  Nest,
} from "../../../types/nests/nests.js";
import { includeBuilder } from "../../../utils/builders.js";
import { IncludeParameters } from "../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: NestIdRequest,
  include?: IncludeParameters[]
): Promise<NestAttributes> {
  const includeString = includeBuilder(
    [
      IncludeParameters.EGGS,
      IncludeParameters.SERVERS,
    ],
    include || []
  );
  const http = await client.http();

  const response = await http.get<Nest>(
    `/application/nests/${data.id}${includeString}`
  );
  return response.data.attributes;
}