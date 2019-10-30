import { Base } from ".";

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
});
