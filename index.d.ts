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
  constructor(options: TOptions);
  options: TOptions;
}
export {};
