import { Base, ExtendBaseWith } from "../../index.js";

import { requestPlugin } from "./request-plugin.js";

export const RestApiClient: ExtendBaseWith<
  Base,
  {
    defaults: {
      userAgent: string;
    };
    plugins: [typeof requestPlugin];
  }
>;

export type RestApiClient = typeof RestApiClient;
