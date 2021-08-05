import { Base } from "../../index.js";

declare module "../.." {
  namespace Base {
    interface Options {
      /**
       * Base URL for all http requests
       */
      baseUrl: string;

      /**
       * Set a custom user agent. Defaults to "rest-api-client/1.0.0"
       */
      userAgent?: string;

      /**
       * Optional http request headers that will be set on all requsets
       */
      headers?: {
        authorization?: string;
        accept?: string;
        [key: string]: string | undefined;
      };
    }
  }
}

interface Response {
  status: number;
  headers: Record<string, string>;
  data?: Record<string, unknown>;
}

interface Parameters {
  headers?: Record<string, string>;
  [parameter: string]: unknown;
}

interface RequestInterface {
  (route: string, parameters?: Parameters): Promise<Response>;
}

export declare function requestPlugin(
  base: Base,
  options: Base.Options
): {
  request: RequestInterface;
};
