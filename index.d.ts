export declare namespace Base {
  interface Options {}
}

declare type ApiExtension = {
  [key: string]: unknown;
};
export declare type Plugin = (
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

type ClassWithPlugins = Constructor<any> & {
  plugins: Plugin[];
};

type RemainingRequirements<PredefinedOptions> =
  keyof PredefinedOptions extends never
    ? Base.Options
    : Omit<Base.Options, keyof PredefinedOptions>;

type NonOptionalKeys<Obj> = {
  [K in keyof Obj]: {} extends Pick<Obj, K> ? undefined : K;
}[keyof Obj];

type RequiredIfRemaining<PredefinedOptions, NowProvided> = NonOptionalKeys<
  RemainingRequirements<PredefinedOptions>
> extends undefined
  ? [(Partial<Base.Options> & NowProvided)?]
  : [
      Partial<Base.Options> &
        RemainingRequirements<PredefinedOptions> &
        NowProvided
    ];

type ConstructorRequiringOptionsIfNeeded<
  Class extends ClassWithPlugins,
  PredefinedOptions
> = {
  defaults: PredefinedOptions;
} & {
  new <NowProvided>(
    ...options: RequiredIfRemaining<PredefinedOptions, NowProvided>
  ): Class & {
    options: NowProvided & PredefinedOptions;
  };
};

export declare class Base<TOptions extends Base.Options = Base.Options> {
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
   * const MyBase = Base.withPlugins([helloWorld]);
   * const base = new MyBase();
   * base.helloWorld(); // `base.helloWorld` is typed as function
   * ```
   */
  static withPlugins<
    Class extends ClassWithPlugins,
    Plugins extends [Plugin, ...Plugin[]]
  >(
    this: Class,
    plugins: Plugins
  ): Class & {
    plugins: [...Class["plugins"], ...Plugins];
  } & Constructor<UnionToIntersection<ReturnTypeOf<Plugins>>>;

  /**
   * Set defaults for the constructor
   *
   * ```js
   * const MyBase = Base.withDefaults({ version: '1.0.0', otherDefault: 'value' });
   * const base = new MyBase({ option: 'value' }); // `version` option is not required
   * base.options // typed as `{ version: string, otherDefault: string, option: string }`
   * ```
   * @remarks
   * Ideally, we would want to make this infinitely recursive: allowing any number of
   * .withDefaults({ ... }).withDefaults({ ... }).withDefaults({ ... }).withDefaults({ ... })...
   * However, we don't see a clean way in today's TypeScript syntax to do so.
   * We instead artificially limit accurate type inference to just three levels,
   * since real users are not likely to go past that.
   * @see https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/pull/57
   */
  static withDefaults<
    PredefinedOptionsOne,
    ClassOne extends Constructor<Base<Base.Options & PredefinedOptionsOne>> &
      ClassWithPlugins
  >(
    this: ClassOne,
    defaults: PredefinedOptionsOne
  ): ConstructorRequiringOptionsIfNeeded<ClassOne, PredefinedOptionsOne> & {
    withDefaults<ClassTwo, PredefinedOptionsTwo>(
      this: ClassTwo,
      defaults: PredefinedOptionsTwo
    ): ConstructorRequiringOptionsIfNeeded<
      ClassOne & ClassTwo,
      PredefinedOptionsOne & PredefinedOptionsTwo
    > & {
      withDefaults<ClassThree, PredefinedOptionsThree>(
        this: ClassThree,
        defaults: PredefinedOptionsThree
      ): ConstructorRequiringOptionsIfNeeded<
        ClassOne & ClassTwo & ClassThree,
        PredefinedOptionsOne & PredefinedOptionsTwo & PredefinedOptionsThree
      > &
        ClassOne &
        ClassTwo &
        ClassThree;
    } & ClassOne &
      ClassTwo;
  } & ClassOne;

  /**
   * list of plugins that will be applied to all instances
   */
  static plugins: Plugin[];

  /**
   * list of default options that will be applied to all instances
   */
  static defaults: {};

  /**
   * options passed to the constructor as constructor defaults
   */
  options: TOptions;

  constructor(options: TOptions);
}
export {};
