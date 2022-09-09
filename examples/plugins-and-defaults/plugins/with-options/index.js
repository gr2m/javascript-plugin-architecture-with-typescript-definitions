/// <reference path="./index.d.ts" />

/**
 * @param {import('../../../..').Base} base
 * @param {import('../../../..').Base.Options} options
 */
export function withOptionsPlugin(base, options) {
  return {
    getOptionalOption() {
      return options.optional || "my default";
    },
    getRequriedOption() {
      return options.required;
    },
  };
}
