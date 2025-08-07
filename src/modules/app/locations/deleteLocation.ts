import { PteroApp } from "../../../core/client.js";
import { LocationIdRequest } from "../../../types/locations/locations.js";

export async function deleteLocation(
  client: PteroApp,
  data: LocationIdRequest
): Promise<boolean> {
  if (!data.id) {
    throw new Error("Location ID is required to delete a location.");
  }
  const http = await client.http();
  const response = await http.delete<void>(`/application/locations/${data.id}`);

  if (response.status !== 204) {
    throw new Error("Failed to delete location.");
  }

  return true;
}