import { FilterParameters } from "../types/enums.js";

export function filterBuilder(
    allowedFilters: FilterParameters[],
    filters: Record<string, string>
): string {
    if (!filters || typeof filters !== "object") return "";

    const params = Object.entries(filters)
        .filter(([key]) => allowedFilters.includes(key as FilterParameters))
        .map(
            ([key, value]) =>
                `filter[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`
        );

    return params.length ? `?${params.join("&")}` : "";
}