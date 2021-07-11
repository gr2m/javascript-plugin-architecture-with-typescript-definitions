export declare namespace Base {
  interface Options {
    version: string;
    [key: string]: unknown;
  }
}

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

export declare class Base<
  TOptions extends Partial<Base.Options> = Base.Options
> {
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
    plugins: Plugin[];
  } & Constructor<UnionToIntersection<ReturnTypeOf<T1> & ReturnTypeOf<T2>>>;

  static defaults<
    TDefaults extends Partial<Base.Options>,
    S extends Constructor<Base<Partial<Base.Options>>>
  >(
    this: S,
    defaults: TDefaults
  ): {
    new (...args: any[]): {
      options: Omit<TDefaults, "version">;
      version: TDefaults["version"];
    };
  } & S;

  constructor(options: TOptions);
  options: Omit<TOptions, "version">;
  version: TOptions["version"];
}
