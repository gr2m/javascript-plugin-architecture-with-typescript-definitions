import { expectType } from "tsd";

import { RestApiClient } from "./index.js";

// @ts-expect-error - An argument for 'options' was not provided
let value: typeof RestApiClient = new RestApiClient();

expectType<{ userAgent: string }>(value.defaults);

expectType<{ userAgent: string }>(RestApiClient.defaults);

// @ts-expect-error - Type '{}' is missing the following properties from type 'Options': myRequiredUserOption
new RestApiClient({});

new RestApiClient({
  baseUrl: "https://api.github.com",
  userAgent: "my-app/v1.0.0",
});

export async function test() {
  const client = new RestApiClient({
    baseUrl: "https://api.github.com",
    headers: {
      authorization: "token 123456789",
    },
  });

  expectType<
    Promise<{
      status: number;
      headers: Record<string, string>;
      data?: Record<string, unknown>;
    }>
  >(client.request(""));

  const getUserResponse = await client.request("GET /user");
  expectType<{
    status: number;
    headers: Record<string, string>;
    data?: Record<string, unknown>;
  }>(getUserResponse);

  client.request("GET /repos/{owner}/{repo}", {
    owner: "gr2m",
    repo: "javascript-plugin-architecture-with-typescript-definitions",
  });
}
