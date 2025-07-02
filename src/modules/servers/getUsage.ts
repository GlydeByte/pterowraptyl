import { PteroClient } from "../../core/client.js";
import { IdentifierRequest, ServerResources, ServerResourcesResponse } from "../../types/servers/servers.js"; 

export async function getUsage(client: PteroClient, data: IdentifierRequest): Promise<ServerResources> {
    const http = await client.http();
    const response = await http.get<ServerResourcesResponse>(`/client/servers/${data.identifier}/resources`);

    return response.data.attributes; 
}