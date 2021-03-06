export class Base {
  constructor(options = {}) {
    this.options = options;
    this.constructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this, options));
    });
  }

  static plugin(...newPlugins) {
    const currentPlugins = this.plugins;
    return class extends this {
      static plugins = currentPlugins.concat(
        newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
      );
    };
  }
  static defaults(defaults) {
    return class extends this {
      constructor(options) {
        super({
          ...defaults,
          ...options,
        });
      }
    };
  }

  static plugins = [];
}
