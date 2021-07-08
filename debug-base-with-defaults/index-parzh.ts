type WithOptional<
  OriginalObject extends object,
  OptionalKey extends keyof OriginalObject = never
> = Omit<OriginalObject, OptionalKey> &
  Partial<Pick<OriginalObject, OptionalKey>>;

type KeyOfByValue<Obj extends object, Value> = {
  [Key in keyof Obj]: Obj[Key] extends Value ? Key : never;
}[keyof Obj];

type RequiredKey<Obj extends object> = Exclude<
  KeyOfByValue<Obj, Exclude<Obj[keyof Obj], undefined>>,
  undefined
>;

type OptionalParamIfEmpty<Obj extends object> = RequiredKey<Obj> extends never
  ? [Obj?]
  : [Obj];

interface Constructor<Params extends object, Instance extends object = object> {
  new (...args: OptionalParamIfEmpty<Params>): Instance;
}

interface Options {
  foo: string;
  bar: number;
  baz: boolean;
}

class Base {
  static defaults<OptionalKey extends keyof Options>(
    defaults: { [Key in OptionalKey]: Options[Key] }
  ) {
    return class BaseWithDefaults extends Base {
      constructor(
        ...[partialParams]: OptionalParamIfEmpty<
          WithOptional<Options, OptionalKey>
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

const MyBase = Base.defaults({ foo: "bar" });
const OhMyBase = MyBase.defaults({ bar: 1 });
const base = new OhMyBase({
  baz: true,
  foo: "baz",
});
