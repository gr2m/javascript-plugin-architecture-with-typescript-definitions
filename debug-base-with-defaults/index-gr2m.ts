type Optional<T extends object, K extends string | number | symbol> = Omit<
  T,
  K
> &
  Partial<Pick<T, keyof T & K>>;

interface Options {
  version: string;
}

type Constructor<T> = new (...args: any[]) => T;

class Base<
  TDefaults extends Partial<Options>,
  TOptions extends Optional<Options, keyof TDefaults>
> {
  static defaults<
    TDefaultsOptions extends Partial<Options> & Record<string, unknown>,
    TOptionalOptions extends Optional<Options, keyof TDefaultsOptions>,
    S extends Constructor<Base<TDefaultsOptions, TOptionalOptions>>
  >(
    this: S,
    defaults: TDefaultsOptions
  ): {
    new (...args: any[]): {
      options: TOptionalOptions;
    };
  } & S {
    return class extends this {
      constructor(...args: any[]) {
        super(Object.assign({}, defaults, args[0] || {}));
      }
    };
  }

  constructor(options: TOptions & Record<string, unknown>) {
    this.options = options;
  }

  options: TOptions;
}

const test = new Base({
  // `version` should be typed as required for the `Base` constructor
  version: "1.2.3",
});
const MyBaseWithDefaults = Base.defaults({
  // `version` should be typed as optional for `.defaults()`
  customDefault: "",
});
const MyBaseWithVersion = Base.defaults({
  version: "1.2.3",
  customDefault: "",
});
const testWithDefaults = new MyBaseWithVersion({
  // `version` should not be required to be set at all
  customOption: "",
});

// should be both typed as string
testWithDefaults.options.version;
testWithDefaults.options.customDefault;
testWithDefaults.options.customOption;
