// <utils>
// by Dima Parzhitsky https://github.com/parzh (https://stackoverflow.com/a/68254847/206879)
type WithOptionalKeys<
  OriginalObject extends object,
  OptionalKey extends keyof OriginalObject = never
> = Omit<OriginalObject, OptionalKey> &
  Partial<Pick<OriginalObject, OptionalKey>>;

type KeyOfByValue<Obj extends object, Value> = {
  [Key in keyof Obj]: Obj[Key] extends Value ? Key : never;
}[keyof Obj];

type RequiredKeys<Obj extends object> = Exclude<
  KeyOfByValue<Obj, Exclude<Obj[keyof Obj], undefined>>,
  undefined
>;

type OptionalParamIfEmpty<Obj extends object> = RequiredKeys<Obj> extends never
  ? [Obj?]
  : [Obj];
// </utils>

interface Options {
  version: string;
  customDefault?: string;
  customOption?: string;
}

interface Constructor<Params extends object, Instance extends object = object> {
  new (...args: OptionalParamIfEmpty<Params>): Instance;
}

class Base {
  static defaults<OptionalKey extends keyof Options>(
    defaults: { [Key in OptionalKey]: Options[Key] }
  ): Constructor<WithOptionalKeys<Options, OptionalKey>, Base> {
    return class BaseWithDefaults extends Base {
      constructor(
        ...[partialParams]: OptionalParamIfEmpty<
          WithOptionalKeys<Options, OptionalKey>
        >
      ) {
        super({ ...defaults, ...partialParams } as Options);
      }
    };
  }

  public options: Options;

  constructor(options: Options) {
    this.options = options;
  }
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
