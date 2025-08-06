import { PteroClient } from "../../../core/client.js";
import { TwoFactorDisable } from "../../../types/accounts/accounts.js";

export async function disableTwoFa(client: PteroClient, disableTwoFaData: TwoFactorDisable): Promise<boolean> {
    const http = await client.http();
    await http.post("/client/account/two-factor/disable", disableTwoFaData);
    return true;
}