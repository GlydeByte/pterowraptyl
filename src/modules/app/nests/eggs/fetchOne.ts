import { PteroApp } from "../../../../core/client.js";
import {
  NestEggRequest,
  EggAttributes,
  Egg,
} from "../../../../types/nests/nests.js";
import { includeBuilder } from "../../../../utils/builders.js";
import { IncludeParameters } from "../../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: NestEggRequest,
  include?: IncludeParameters[]
): Promise<EggAttributes> {
  const includeString = includeBuilder(
    [
      IncludeParameters.VARIABLES,
      IncludeParameters.NEST,
    ],
    include || []
  );
  const http = await client.http();

  const response = await http.get<Egg>(
    `/application/nests/${data.nestId}/eggs/${data.eggId}${includeString}`
  );
  return response.data.attributes;
}