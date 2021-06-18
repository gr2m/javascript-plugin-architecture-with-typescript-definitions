import { expectType } from "tsd";
import { Base } from "./index.js";

import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options";

const base = new Base();

// @ts-expect-error unknown properties cannot be used, see #31
base.unknown;

const FooBase = Base.plugin(fooPlugin).defaults({
  default: "value",
});
const fooBase = new FooBase({
  option: "value",
});

expectType<string>(fooBase.options.default);
expectType<string>(fooBase.options.option);
expectType<string>(fooBase.foo);

const BaseWithVoidPlugin = Base.plugin(voidPlugin);
const baseWithVoidPlugin = new BaseWithVoidPlugin();

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidPlugin.unknown;

const BaseWithFooAndBarPlugins = Base.plugin(barPlugin, fooPlugin);
const baseWithFooAndBarPlugins = new BaseWithFooAndBarPlugins();

expectType<string>(baseWithFooAndBarPlugins.foo);
expectType<string>(baseWithFooAndBarPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithFooAndBarPlugins.unknown;

const BaseWithVoidAndNonVoidPlugins = Base.plugin(
  barPlugin,
  voidPlugin,
  fooPlugin
);
const baseWithVoidAndNonVoidPlugins = new BaseWithVoidAndNonVoidPlugins();

expectType<string>(baseWithVoidAndNonVoidPlugins.foo);
expectType<string>(baseWithVoidAndNonVoidPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidAndNonVoidPlugins.unknown;

const BaseWithOptionsPlugin = Base.plugin(withOptionsPlugin);
const baseWithOptionsPlugin = new BaseWithOptionsPlugin();

expectType<string>(baseWithOptionsPlugin.getFooOption());
