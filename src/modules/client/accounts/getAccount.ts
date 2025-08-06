import { PteroClient } from "../../../core/client.js";
import { Account, AccountResponse } from "../../../types/accounts/accounts.js";


export async function getAccount(client: PteroClient): Promise<Account> {
    const http = await client.http();
    const response = await http.get<AccountResponse>("/client/account");
    return response.data.attributes;
};