import { Base } from "../..";

declare module "../.." {
  namespace Base {
    interface Options {
      foo: "string";
    }
  }
}

export function complexPlugin(
  base: Base,
  options: Base.Options
): {
  complex: {
    foo: string;
    bar: string;
    getFooOption: () => Base.Options["foo"];
  };
};
