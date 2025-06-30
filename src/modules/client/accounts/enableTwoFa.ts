import { PteroClient } from "../../../core/client.js";
import { TwoFactorEnableRequest, TwoFactorEnable } from "../../../types/client/accounts/accounts.js";

export async function enableTwoFa(client: PteroClient, enableTwoFaData: TwoFactorEnableRequest): Promise<{ tokens: string[] }> {
    const http = await client.http();
    const response = await http.post<TwoFactorEnable>("/client/account/two-factor", enableTwoFaData);
    return { tokens: response.data.attributes.tokens };
}   