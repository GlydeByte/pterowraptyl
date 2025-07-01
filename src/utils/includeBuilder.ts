import { IncludeParameters } from "../types/enums.js";

export function includeBuilder(allowedIncludes: IncludeParameters[], include: IncludeParameters[]): string {
    let includeString = "?include=";
    if (!include || include.length === 0) {
        return "";
    }
    include.forEach(i => {
        if (!allowedIncludes.includes(i)) {
            throw new Error(`Invalid include parameter: ${i}. Allowed parameters are: ${allowedIncludes.join(", ")}`);
        } else {
            // If the include is valid, we can proceed
            includeString += `${i},`;
        }
    })
    // Remove the last comma
    includeString = includeString.slice(0, -1);
    
    return includeString;
}

