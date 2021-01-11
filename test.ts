import { Base } from "./src";

const fooPlugin = (test: Base) => {
  console.log("plugin evalutes");

  return {
    foo: () => "foo",
  };
};
const barPlugin = (test: Base) => {
  console.log("plugin evalutes");

  return {
    bar: () => "bar",
  };
};
const pluginWithEmptyObjectReturn = (test: Base) => {
  return {};
};

describe("Base", () => {
  it(".plugin(fooPlugin)", () => {
    const FooTest = Base.plugin(fooPlugin);
    const fooTest = new FooTest();
    expect(fooTest.foo()).toEqual("foo");
  });
  it(".plugin(fooPlugin, barPlugin)", () => {
    const FooBarTest = Base.plugin(fooPlugin, barPlugin);
    const fooBarTest = new FooBarTest();
    expect(fooBarTest.foo()).toEqual("foo");
    expect(fooBarTest.bar()).toEqual("bar");
  });
  it(".plugin(fooPlugin, barPlugin, pluginWithVoidReturn)", () => {
    const FooBarTest = Base.plugin(
      fooPlugin,
      barPlugin,
      pluginWithEmptyObjectReturn
    );
    const fooBarTest = new FooBarTest();
    expect(fooBarTest.foo()).toEqual("foo");
    expect(fooBarTest.bar()).toEqual("bar");
  });
  it(".plugin(fooPlugin).plugin(barPlugin)", () => {
    const FooBarTest = Base.plugin(fooPlugin).plugin(barPlugin);
    const fooBarTest = new FooBarTest();
    expect(fooBarTest.foo()).toEqual("foo");
    expect(fooBarTest.bar()).toEqual("bar");
  });
  it(".defaults({foo: 'bar'})", () => {
    const BaseWithDefaults = Base.defaults({ foo: "bar" });
    const defaultsTest = new BaseWithDefaults();
    const mergedOptionsTest = new BaseWithDefaults({ baz: "daz" });
    expect(defaultsTest.options).toStrictEqual({ foo: "bar" });
    expect(mergedOptionsTest.options).toStrictEqual({ foo: "bar", baz: "daz" });
  });

  it(".plugin().defaults()", () => {
    const BaseWithPluginAndDefaults = Base.plugin(fooPlugin).defaults({
      baz: "daz",
    });
    const BaseWithDefaultsAndPlugin = Base.defaults({
      baz: "daz",
    }).plugin(fooPlugin);

    const instance1 = new BaseWithPluginAndDefaults();
    const instance2 = new BaseWithDefaultsAndPlugin();

    expect(instance1.foo()).toEqual("foo");
    expect(instance1.options).toStrictEqual({ baz: "daz" });
    expect(instance2.foo()).toEqual("foo");
    expect(instance2.options).toStrictEqual({ baz: "daz" });
  });
});
