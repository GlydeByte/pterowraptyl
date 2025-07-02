import { PteroClient } from "../../core/client.js";
import { IdentifierRequest, Server, ServerResponse } from "../../types/servers/servers.js";
import { IncludeParameters } from "../../types/enums.js";
import { includeBuilder } from "../../utils/includeBuilder.js";

export async function getServer(client: PteroClient, data: IdentifierRequest, include?: IncludeParameters[]): Promise<Server> {
    // Only allow "egg" and/or "subusers" in include, nothing else
    const includeString = includeBuilder([IncludeParameters.EGG, IncludeParameters.SUBUSERS], include || []);

    const http = await client.http();
    const response = await http.get<ServerResponse>(`/client/servers/${data.identifier}${includeString}`);
    return response.data.attributes;
};