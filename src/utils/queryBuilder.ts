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
export function queryBuilder(params: [string, string] | [string, string, string] | [string, string, string, string]): string {
    // Filter out empty strings and remove leading '?' from each param
    const validParams = params
        .filter(param => param && param.trim() !== "")
        .map(param => param.startsWith("?") ? param.substring(1) : param)
        .filter(param => param.length > 0);

    // Return combined query string or empty string
    return validParams.length > 0 ? `?${validParams.join("&")}` : "";
}