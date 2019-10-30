import { Base } from "./src";

const fooPlugin = (test: Base) => {
  console.log("plugin evalutes");

  return {
    foo: () => "foo"
  };
};
const barPlugin = (test: Base) => {
  console.log("plugin evalutes");

  return {
    bar: () => "bar"
  };
};

describe("Base", () => {
  it(".plugin(fooPlugin)", () => {
    const FooTest = Base.plugin(fooPlugin);
    const fooTest = new FooTest();
    expect(fooTest.foo()).toEqual("foo");
  });
  it(".plugin([fooPlugin, barPlugin])", () => {
    const FooBarTest = Base.plugin([fooPlugin, barPlugin]);
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
});
