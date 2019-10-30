type ApiExtension = { [key: string]: any };
type TestPlugin = (instance: Base) => ApiExtension | undefined;
type Constructor<T> = new (...args: any[]) => T;

/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
type UnionToIntersection<Union> = (Union extends any
  ? (argument: Union) => void
  : never) extends (argument: infer Intersection) => void // tslint:disable-line: no-unused
  ? Intersection
  : never;

type AnyFunction = (...args: any) => any;

type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
  : never;

export class Base {
  static plugins: TestPlugin[] = [];
  static plugin<T extends TestPlugin | TestPlugin[]>(plugin: T) {
    const currentPlugins = this.plugins;

    const BaseWithPlugins = class extends this {
      static plugins = currentPlugins.concat(plugin);
    };

    type Extension = ReturnTypeOf<T>;
    return BaseWithPlugins as typeof BaseWithPlugins & Constructor<Extension>;
  }

  constructor() {
    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor as typeof Base;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this));
    });
  }
}
