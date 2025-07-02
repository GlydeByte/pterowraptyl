import {
  FilterParameters,
  SortParameters,
  IncludeParameters,
} from "../types/enums.js";
import { PaginationOptions } from "../types/common.js";

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

export function includeBuilder(
  allowedIncludes: IncludeParameters[],
  include: IncludeParameters[]
): string {
  let includeString = "?include=";
  if (!include || include.length === 0) {
    return "";
  }
  include.forEach((i) => {
    if (!allowedIncludes.includes(i)) {
      throw new Error(
        `Invalid include parameter: ${i}. Allowed parameters are: ${allowedIncludes.join(
          ", "
        )}`
      );
    } else {
      // If the include is valid, we can proceed
      includeString += `${encodeURIComponent(i)},`;
    }
  });
  // Remove the last comma
  includeString = includeString.slice(0, -1);

  return includeString;
}

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

export function sortBuilder(
  allowedFilters: SortParameters[],
  sort: string
): string {
  const isReversed = sort.startsWith("-");
  sort = isReversed ? sort.slice(1) : sort;
  let sortString = "?sort=";
  if (
    !sort ||
    sort === "" ||
    !allowedFilters.includes(sort as SortParameters)
  ) {
    return "";
  }

  sortString += isReversed
    ? `-${encodeURIComponent(sort)}`
    : encodeURIComponent(sort);
  return sortString;
}

/**
 * Combines multiple query parameter strings into a single query string.
 * Removes leading '?' from individual builders and joins them with '&'.
 *
 * @param params - Array of 2-4 query parameter strings from builders
 * @returns Combined query string starting with '?' or empty string
 *
 * @example
 * ```ts
 * const query = queryBuilder([
 *   includeBuilder([IncludeParameters.EGG], [IncludeParameters.EGG]),
 *   filterBuilder([FilterParameters.EMAIL], "test@example.com"),
 *   paginationBuilder({ page: 2, per_page: 25 })
 * ]);
 * // Returns: "?include=egg&filter[email]=test@example.com&per_page=25&page=2"
 * ```
 */
export function queryBuilder(
  params:
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
): string {
  // Filter out empty strings and remove leading '?' from each param
  const validParams = params
    .filter((param) => param && param.trim() !== "")
    .map((param) => (param.startsWith("?") ? param.substring(1) : param))
    .filter((param) => param.length > 0);

  // Return combined query string or empty string
  return validParams.length > 0 ? `?${validParams.join("&")}` : "";
}
