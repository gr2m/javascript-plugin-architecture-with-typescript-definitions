export declare namespace Base {
  interface Options {
    version: string;
    [key: string]: unknown;
  }
}

type Defaults = Partial<Base.Options>;

declare type ApiExtension = {
  [key: string]: unknown;
};
declare type Plugin = (
  instance: Base,
  options: Base.Options
) => ApiExtension | void;

declare type Constructor<T> = new (...args: any[]) => T;
/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
declare type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
  ? Intersection
  : never;
declare type AnyFunction = (...args: any) => any;
declare type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> =
  T extends AnyFunction
    ? ReturnType<T>
    : T extends AnyFunction[]
    ? UnionToIntersection<Exclude<ReturnType<T[number]>, void>>
    : never;

export declare class Base<TOptions extends Base.Options = Base.Options> {
  static plugins: Plugin[];

  /**
   * Pass one or multiple plugin functions to extend the `Base` class.
   * The instance of the new class will be extended with any keys returned by the passed plugins.
   * Pass one argument per plugin function.
   *
   * ```js
   * export function helloWorld() {
   *   return {
   *     helloWorld () {
   *       console.log('Hello world!');
   *     }
   *   };
   * }
   *
   * const MyBase = Base.plugin(helloWorld);
   * const base = new MyBase();
   * base.helloWorld(); // `base.helloWorld` is typed as function
   * ```
   */
  static plugin<
    S extends Constructor<any> & {
      plugins: any[];
    },
    T1 extends Plugin,
    T2 extends Plugin[]
  >(
    this: S,
    plugin1: T1,
    ...additionalPlugins: T2
  ): S & {
    plugins: any[];
  } & Constructor<UnionToIntersection<ReturnTypeOf<T1> & ReturnTypeOf<T2>>>;

  /**
   * Set defaults for the constructor
   *
   * ```js
   * const MyBase = Base.defaults({ version: '1.0.0', otherDefault: 'value' });
   * const base = new MyBase({ option: 'value' }); // `version` option is not required
   * base.options // typed as `{ version: string, otherDefault: string, option: string }`
   * ```
   */
  static defaults<
    TDefaults extends Base.Options,
    S extends Constructor<Base<TDefaults>>
  >(
    this: S,
    defaults: Partial<TDefaults>
  ): {
    new (...args: any[]): {
      options: TDefaults;
    };
  } & S;

  /**
   * options passed to the constructor as constructor defaults
   */
  options: TOptions;

  constructor(options: TOptions);
}
export {};
