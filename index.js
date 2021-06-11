export class Base {
  constructor(options = {}) {
    this.options = options;
    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor;
    classConstructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this, options));
    });
  }
  static plugin(plugin1, ...additionalPlugins) {
    var _a;
    const currentPlugins = this.plugins;
    let newPlugins = [plugin1, ...additionalPlugins];
    const BaseWithPlugins =
      ((_a = class extends this {}),
      (_a.plugins = currentPlugins.concat(
        newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
      )),
      _a);
    return BaseWithPlugins;
  }
  static defaults(defaults) {
    const BaseWitDefaults = class extends this {
      constructor(...args) {
        super(Object.assign({}, defaults, args[0] || {}));
      }
    };
    return BaseWitDefaults;
  }
}
Base.plugins = [];
