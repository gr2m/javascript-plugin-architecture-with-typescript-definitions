# Custom class with defaults and plugins (TypeScript Declaration example)

This example does not implement any code, it's meant as a reference for types only.

Usage example:

```js
import { RestApiClient } from "javascript-plugin-architecture-with-typescript-definitions/examples/rest-api-client-dts";

const client = new RestApiClient({
  baseUrl: "https://api.github.com",
  userAgent: "my-app/1.0.0",
  headers: {
    authorization: "token ghp_aB3...",
  },
});

const { data } = await client.request("GET /user");
console.log("You are logged in as %s", data.login);
```
