import { PteroApp } from "../../../core/client.js";
import { CreateLocationRequest, Location } from "../../../types/locations/locations.js";

export async function createLocation(
  client: PteroApp,
  data: CreateLocationRequest
): Promise<Location> {
  const http = await client.http();
  const response = await http.post<Location>("/application/locations", data);
  return response.data;
}