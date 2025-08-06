import { PteroApp } from "../../../core/client.js";
import {
  UserIdRequest,
  UserAttributes,
  User,
} from "../../../types/users/users.js";
import { includeBuilder } from "../../../utils/builders.js";
import { IncludeParameters } from "../../../types/enums.js";

export async function fetchOne(
  client: PteroApp,
  data: UserIdRequest,
  include?: IncludeParameters[]
): Promise<UserAttributes> {
  const includeString = includeBuilder(
    [IncludeParameters.SERVERS],
    include || []
  );
  const http = await client.http();


  if (data.id) {
    const response = await http.get<User>(
      `/application/users/${data.id}${includeString}`
    );
    return response.data.attributes;
  } else if (data.external_id) {
    const response = await http.get<User>(
      `/application/users/external/${data.external_id}${includeString}`
    );
    return response.data.attributes;
  } else {
    throw new Error("Either id or external_id must be provided.");
  }
}
