import { Base } from "../../index.js";

import { requestPlugin } from "./request-plugin.js";

declare type Constructor<T> = new (...args: any[]) => T;

export class RestApiClient extends Base {
  request: ReturnType<typeof requestPlugin>["request"];
}
