type Options = {
  [key: string]: unknown;
};

type ApiExtension = { [key: string]: unknown };
type TestPlugin = (
  instance: Base,
  options: Options
) => ApiExtension | undefined;
type Constructor<T> = new (...args: any[]) => T;

/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void // tslint:disable-line: no-unused
  ? Intersection
  : never;

type AnyFunction = (...args: any) => any;

type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never;

export class Base<TOptions extends Options = Options> {
  static plugins: TestPlugin[] = [];
  static plugin<
    S extends Constructor<any> & { plugins: any[] },
    T1 extends TestPlugin,
    T2 extends TestPlugin[]
  >(this: S, plugin1: T1, ...additionalPlugins: T2) {
    const currentPlugins = this.plugins;
    let newPlugins: (TestPlugin | undefined)[] = [
      plugin1,
      ...additionalPlugins,
    ];

    const BaseWithPlugins = class extends this {
      static plugins = currentPlugins.concat(
        newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
      );
    };

    return BaseWithPlugins as typeof this & { plugins: any[] } & Constructor<
        UnionToIntersection<ReturnTypeOf<T1> & ReturnTypeOf<T2>>
      >;
  }

  static defaults<
    TDefaults extends Options,
    S extends Constructor<Base<TDefaults>>
  >(this: S, defaults: TDefaults) {
    const BaseWitDefaults = class extends this {
      constructor(...args: any[]) {
        super(Object.assign({}, defaults, args[0] || {}));
      }
    };

    return BaseWitDefaults as typeof BaseWitDefaults & typeof this;
  }

  constructor(options: TOptions = {} as TOptions) {
    this.options = options;

    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor as typeof Base;
    classConstructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this, options));
    });
  }

  options: TOptions;
}
