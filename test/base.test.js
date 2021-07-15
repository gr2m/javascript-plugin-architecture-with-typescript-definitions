import { test } from "uvu";
import * as assert from "uvu/assert";

import { Base } from "../index.js";
import { fooPlugin } from "../plugins/foo/index.js";
import { barPlugin } from "../plugins/bar/index.js";
import { voidPlugin } from "../plugins/void/index.js";

test(".plugin(fooPlugin)", () => {
  const FooTest = Base.plugin(fooPlugin);
  const fooTest = new FooTest();
  assert.equal(fooTest.foo, "foo");
});
test(".plugin(fooPlugin, barPlugin)", () => {
  const FooBarTest = Base.plugin(fooPlugin, barPlugin);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".plugin(fooPlugin, barPlugin, voidPlugin)", () => {
  const FooBarTest = Base.plugin(fooPlugin, barPlugin, voidPlugin);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".plugin(fooPlugin).plugin(barPlugin)", () => {
  const FooBarTest = Base.plugin(fooPlugin).plugin(barPlugin);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".defaults({foo: 'bar'})", () => {
  const BaseWithDefaults = Base.defaults({ foo: "bar" });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ baz: "daz" });
  assert.equal(BaseWithDefaults.defaultOptions, { foo: "bar" });
  assert.equal(defaultsTest.options, { foo: "bar" });
  assert.equal(mergedOptionsTest.options, { foo: "bar", baz: "daz" });
});

test(".defaults({foo: 'bar', baz: 'daz' })", () => {
  const BaseWithDefaults = Base.defaults({ foo: "bar" }).defaults({ baz: "daz" });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ faz: "boo" });
  assert.equal(BaseWithDefaults.defaultOptions, { foo: "bar", baz: "daz" });
  assert.equal(defaultsTest.options, { foo: "bar", baz: "daz" });
  assert.equal(mergedOptionsTest.options, { foo: "bar", baz: "daz", faz: "boo" });
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

  assert.equal(instance1.foo, "foo");
  assert.equal(instance1.options, { baz: "daz" });
  assert.equal(instance2.foo, "foo");
  assert.equal(instance2.options, { baz: "daz" });
});

test.run();
