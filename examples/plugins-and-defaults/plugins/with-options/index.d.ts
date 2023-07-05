import { Base } from "../../../../index.js";

declare module "../../../.." {
  namespace Base {
    interface Options {
      optional?: string;
      required: string;
    }
  }
}

export function withOptionsPlugin(
  base: Base,
  options: Base.Options,
): {
  getOptionalOption: () => Required<Base.Options>["optional"];
  getRequriedOption: () => Base.Options["required"];
};
