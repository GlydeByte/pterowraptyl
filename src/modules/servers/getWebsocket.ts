import { PteroClient } from "../../core/client.js";
import { IdentifierRequest, Websocket, WebsocketResponse } from "../../types/servers/servers.js";


export async function getWebsocket(client: PteroClient, data: IdentifierRequest): Promise<Websocket> {
    const http = await client.http();
    const response = await http.get<WebsocketResponse>(`/client/servers/${data.identifier}/websocket`);
    return response.data.data;
};