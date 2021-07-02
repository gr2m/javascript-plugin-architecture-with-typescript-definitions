export function testWithDefaults(defaults, options) {
  return {
    ...defaults,
    ...options,
  };
}
