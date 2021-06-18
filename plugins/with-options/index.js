/**
 * @param {import('../..').Base} base
 * @param {import('../..').Base.Options} options
 */
export function withOptionsPlugin(base, options) {
  return {
    getFooOption() {
      return options.foo;
    },
  };
}
