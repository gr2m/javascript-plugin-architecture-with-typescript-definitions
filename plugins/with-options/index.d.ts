// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-plugin-d-ts.html
import { Base } from "../..";

declare module "../.." {
  namespace Base {
    interface Options {
      foo?: string;
    }
  }
}

export function withOptionsPlugin(
  base: Base,
  options: Base.Options
): {
  getFooOption: () => Required<Base.Options>["foo"];
};
