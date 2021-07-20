import { test } from "uvu";
import * as assert from "uvu/assert";

import { Base } from "./index.js";
import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";

test(".withPlugins([fooPlugin])", () => {
  const FooTest = Base.withPlugins([fooPlugin]);
  const fooTest = new FooTest();
  assert.equal(fooTest.foo, "foo");
});
test(".withPlugins([fooPlugin, barPlugin])", () => {
  const FooBarTest = Base.withPlugins([fooPlugin, barPlugin]);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".withPlugins([fooPlugin, barPlugin, voidPlugin])", () => {
  const FooBarTest = Base.withPlugins([fooPlugin, barPlugin, voidPlugin]);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".withPlugins([fooPlugin]).withPlugins(barPlugin)", () => {
  const FooBarTest = Base.withPlugins([fooPlugin]).withPlugins([barPlugin]);
  const fooBarTest = new FooBarTest();
  assert.equal(fooBarTest.foo, "foo");
  assert.equal(fooBarTest.bar, "bar");
});
test(".withDefaults({foo: 'bar'})", () => {
  const BaseWithDefaults = Base.withDefaults({ foo: "bar" });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ baz: "daz" });
  assert.equal(BaseWithDefaults.defaults, { foo: "bar" });
  assert.equal(defaultsTest.options, { foo: "bar" });
  assert.equal(mergedOptionsTest.options, { foo: "bar", baz: "daz" });
});
test(".withDefaults({one: 1}).withDefaults({two: 2})", () => {
  const BaseWithDefaults = Base.withDefaults({ one: 1 }).withDefaults({
    two: 2,
  });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ three: 3 });
  assert.equal(defaultsTest.options, { one: 1, two: 2 });
  assert.equal(mergedOptionsTest.options, { one: 1, two: 2, three: 3 });
});

test(".withDefaults({foo: 'bar', baz: 'daz' })", () => {
  const BaseWithDefaults = Base.withDefaults({ foo: "bar" }).withDefaults({
    baz: "daz",
  });
  const defaultsTest = new BaseWithDefaults();
  const mergedOptionsTest = new BaseWithDefaults({ faz: "boo" });
  assert.equal(BaseWithDefaults.defaults, { foo: "bar", baz: "daz" });
  assert.equal(defaultsTest.options, { foo: "bar", baz: "daz" });
  assert.equal(mergedOptionsTest.options, {
    foo: "bar",
    baz: "daz",
    faz: "boo",
  });
});

test(".withPlugins().withDefaults()", () => {
  const BaseWithPluginAndDefaults = Base.withPlugins([fooPlugin]).withDefaults({
    baz: "daz",
  });
  const BaseWithDefaultsAndPlugin = Base.withDefaults({
    baz: "daz",
  }).withPlugins([fooPlugin]);

  const instance1 = new BaseWithPluginAndDefaults();
  const instance2 = new BaseWithDefaultsAndPlugin();

  assert.equal(instance1.foo, "foo");
  assert.equal(instance1.options, { baz: "daz" });
  assert.equal(instance2.foo, "foo");
  assert.equal(instance2.options, { baz: "daz" });
});

test.run();
