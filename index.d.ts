declare type Options = {
    [key: string]: unknown;
};
declare type ApiExtension = {
    [key: string]: any;
};
declare type TestPlugin = (instance: Base, options: Options) => ApiExtension | undefined;
declare type Constructor<T> = new (...args: any[]) => T;
/**
 * @author https://stackoverflow.com/users/2887218/jcalz
 * @see https://stackoverflow.com/a/50375286/10325032
 */
declare type UnionToIntersection<Union> = (Union extends any ? (argument: Union) => void : never) extends (argument: infer Intersection) => void ? Intersection : never;
declare type AnyFunction = (...args: any) => any;
declare type ReturnTypeOf<T extends AnyFunction | AnyFunction[]> = T extends AnyFunction ? ReturnType<T> : T extends AnyFunction[] ? UnionToIntersection<ReturnType<T[number]>> : never;
export declare class Base {
    static plugins: TestPlugin[];
    static plugin<T extends TestPlugin | TestPlugin[]>(plugin: T): {
        new (options?: Options): {
            options: Options;
        };
        plugins: TestPlugin[];
        plugin<T_1 extends TestPlugin | TestPlugin[]>(plugin: T): any & Constructor<ReturnTypeOf<T>>;
        defaults(defaults: Options): {
            new (options?: Options): {
                options: Options;
            };
            plugins: TestPlugin[];
            plugin<T_1 extends TestPlugin | TestPlugin[]>(plugin: T): any & Constructor<ReturnTypeOf<T>>;
            defaults(defaults: Options): any;
        };
    } & Constructor<ReturnTypeOf<T>>;
    static defaults(defaults: Options): {
        new (options?: Options): {
            options: Options;
        };
        plugins: TestPlugin[];
        plugin<T extends TestPlugin | TestPlugin[]>(plugin: T): {
            new (options?: Options): {
                options: Options;
            };
            plugins: TestPlugin[];
            plugin<T extends TestPlugin | TestPlugin[]>(plugin: T): any & Constructor<ReturnTypeOf<T>>;
            defaults(defaults: Options): any;
        } & Constructor<ReturnTypeOf<T>>;
        defaults(defaults: Options): any;
    };
    constructor(options?: Options);
    options: Options;
}
export {};
