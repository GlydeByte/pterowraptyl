import { PteroClient } from "../../../core/client.js";
import { TwoFactor, TwoFactorResponse } from "../../../types/client/accounts/accounts.js";



export async function getTwoFa(client: PteroClient): Promise<TwoFactor> {
    const http = await client.http();
    const response = await http.get<TwoFactorResponse>("/client/account/two-factor");
    return response.data.data;
}