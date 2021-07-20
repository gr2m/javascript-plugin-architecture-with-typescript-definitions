import { Base } from "../../index.js";

export const RestApiClient = Base.withPlugins([requestPlugin]).withDefaults({
  userAgent: "rest-api-client/1.0.0",
});
