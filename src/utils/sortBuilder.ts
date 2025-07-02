import { SortParameters } from "../types/enums.js";

export function sortBuilder(allowedFilters: SortParameters[], sort: string): string {
    const isReversed = sort.startsWith("-");
    sort = isReversed ? sort.slice(1) : sort;
    let sortString = "?sort=";
    if (!sort || sort === "" || !allowedFilters.includes(sort as SortParameters)) {
        return "";
    }

    sortString += isReversed ? `-${encodeURIComponent(sort)}` : encodeURIComponent(sort);
    return sortString;
};