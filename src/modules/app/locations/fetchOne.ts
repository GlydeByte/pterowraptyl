import { PteroApp } from "../../../core/client.js";
import {
  LocationIdRequest,
  LocationAttributes,
  Location,
} from "../../../types/locations/locations.js";
import { includeBuilder } from "../../../utils/builders.js";
import { IncludeParameters } from "../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: LocationIdRequest,
  include?: IncludeParameters[]
): Promise<LocationAttributes> {
  const includeString = includeBuilder(
    [
      IncludeParameters.NODES,
      IncludeParameters.SERVERS,
    ],
    include || []
  );
  const http = await client.http();

  const response = await http.get<Location>(
    `/application/locations/${data.id}${includeString}`
  );
  return response.data.attributes;
}