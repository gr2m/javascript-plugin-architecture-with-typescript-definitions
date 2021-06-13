import { test } from "uvu";
import * as assert from "uvu/assert";

import { Base } from "../index.js";

const fooPlugin = (test) => {
  return {
    foo: () => "foo",
  };
};
const barPlugin = (test) => {
  return {
    bar: () => "bar",
  };
};
const pluginWithEmptyObjectReturn = (test) => {
  return {};
};

test(".plugin(fooPlugin)", () => {
  const FooTest = Base.plugin(fooPlugin);
  const fooTest = new FooTest();
  assert.equal(fooTest.foo(), "foo");
});
test(".plugin(fooPlugin, barPlugin)", () => {
  const FooBarTest = Base.plugin(fooPlugin, barPlugin);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo(), "foo");
  assert.equal(fooBarTest.bar(), "bar");
});
test(".plugin(fooPlugin, barPlugin, pluginWithVoidReturn)", () => {
  const FooBarTest = Base.plugin(
    fooPlugin,
    barPlugin,
    pluginWithEmptyObjectReturn
  );
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo(), "foo");
  assert.equal(fooBarTest.bar(), "bar");
});
test(".plugin(fooPlugin).plugin(barPlugin)", () => {
  const FooBarTest = Base.plugin(fooPlugin).plugin(barPlugin);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo(), "foo");
  assert.equal(fooBarTest.bar(), "bar");
});
test(".defaults({foo: 'bar'})", () => {
  const BaseWithDefaults = Base.defaults({ foo: "bar" });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ baz: "daz" });
  assert.equal(defaultsTest.options, { foo: "bar" });
  assert.equal(mergedOptionsTest.options, { foo: "bar", baz: "daz" });
});

test(".plugin().defaults()", () => {
  const BaseWithPluginAndDefaults = Base.plugin(fooPlugin).defaults({
    baz: "daz",
  });
  const BaseWithDefaultsAndPlugin = Base.defaults({
    baz: "daz",
  }).plugin(fooPlugin);

  const instance1 = new BaseWithPluginAndDefaults();
  const instance2 = new BaseWithDefaultsAndPlugin();

  assert.equal(instance1.foo(), "foo");
  assert.equal(instance1.options, { baz: "daz" });
  assert.equal(instance2.foo(), "foo");
  assert.equal(instance2.options, { baz: "daz" });
});

test.run();
