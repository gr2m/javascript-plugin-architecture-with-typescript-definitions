import { Base } from "../..";

// TODO: add "foo" to Base.Options type

export function withOptionsPlugin(
  base: Base,
  options: Base.Options
): {
  getFooOption: () => Base.Options["foo"];
};
