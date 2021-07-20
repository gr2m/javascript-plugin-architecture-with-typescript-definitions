import { Base } from "../../index.js";

declare module "../.." {
  namespace Base {
    interface Options {
      myRequiredUserOption: string;
    }
  }
}

export class MyBase extends Base {}
