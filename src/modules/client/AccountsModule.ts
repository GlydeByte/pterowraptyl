import { PteroClient } from "../../core/client.js";

import { Account, TwoFactor } from "../../types/client/accounts/accounts.js";
import { getAccount } from "./accounts/getAccount.js";
import { getTwoFa } from "./accounts/getTwoFa.js";

/**
 * Module for accessing Pterodactyl client account endpoints.
 * This module provides methods to access account details, 2fa, update account information, etc.
 * 
 * @example
 * ```ts
 * const account = await ptero.accounts.getAccount();
 * console.log(account);
 * ```
 */
export class AccountsModule {
    constructor(private client: PteroClient) {
        if (!this.client) {
            throw new Error("PteroClient is required.");
        };
    };

    /**
     * Get the account details of the authenticated user.
     * @example
     * ```ts
     * const account = await ptero.accounts.getAccount();
     * console.log(account);
     * ```
     * @returns {Promise<Account>}
     */
    getAccount(): Promise<Account> {
        return getAccount(this.client);
    }


    /**
     * Generates string for 2fa QR code which can be used to set up 2fa in Pterodactyl.
     * @example
     * ```ts
     * const twoFa = await ptero.accounts.getTwoFa();
     * console.log(twoFa);
     * ```
     * @return {Promise<string>}
     */
    getTwoFa(): Promise<TwoFactor> {
        return getTwoFa(this.client);
    }
}