declare type Options = {
  [key: string]: unknown;
};
declare type ApiExtension = {
  [key: string]: unknown;
};
declare type TestPlugin = (
  instance: Base,
  options: Options
) => ApiExtension | undefined;
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
    ? UnionToIntersection<ReturnType<T[number]>>
    : never;

export declare class Base<TOptions extends Options = Options> {
  static plugins: TestPlugin[];
  static plugin<
    S extends Constructor<any> & {
      plugins: any[];
    },
    T1 extends TestPlugin,
    T2 extends TestPlugin[]
  >(
    this: S,
    plugin1: T1,
    ...additionalPlugins: T2
  ): S & {
    plugins: any[];
  } & Constructor<UnionToIntersection<ReturnTypeOf<T1> & ReturnTypeOf<T2>>>;
  static defaults<
    TDefaults extends Options,
    S extends Constructor<Base<TDefaults>>
  >(
    this: S,
    defaults: TDefaults
  ): {
    new (...args: any[]): {
      options: TDefaults;
    };
  } & S;
  constructor(options?: TOptions);
  options: TOptions;
}
export {};
