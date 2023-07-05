import { Base } from "../../index.js";

export function fooPlugin(
  base: Base,
  options: Base.Options,
): {
  foo: string;
};
