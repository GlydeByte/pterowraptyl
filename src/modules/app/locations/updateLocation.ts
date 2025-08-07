import { PteroApp } from "../../../core/client.js";
import {
  LocationUpdateRequest,
  Location,
  LocationAttributes,
} from "../../../types/locations/locations.js";

export async function updateLocation(
  client: PteroApp,
  data: LocationUpdateRequest
): Promise<LocationAttributes> {
  const { id, ...updateData } = data;
  const http = await client.http();
  const response = await http.patch<Location>(
    `/application/locations/${id}`,
    updateData
  );
  return response.data.attributes;
}