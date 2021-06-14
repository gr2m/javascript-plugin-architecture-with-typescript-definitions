export class Base {
  constructor(options = {}) {
    const { version, ...opts } = options;
    this.options = opts;
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
      constructor(...args) {
        super(Object.assign({}, defaults, args[0] || {}));
      }
    };
  }

  static plugins = [];
}
