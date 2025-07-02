import { PaginationOptions } from "../types/common.js";

export function paginationBuilder(options?: PaginationOptions): string {
    if (!options || typeof options !== "object") return "";

    const params: string[] = [];

    if (options.per_page && options.per_page > 0) {
        params.push(`per_page=${encodeURIComponent(options.per_page.toString())}`);
    }

    if (options.page && options.page > 0) {
        params.push(`page=${encodeURIComponent(options.page.toString())}`);
    }

    return params.length ? `?${params.join("&")}` : "";
}