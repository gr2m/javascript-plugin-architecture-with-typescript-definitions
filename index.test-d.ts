import { expectType } from "tsd";
import { Base } from "./index.js";

import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options";
import { complexPlugin } from "./plugins/complex";

const base = new Base({
  version: "1.2.3",
});
expectType<string>(base.version);

// @ts-expect-error version should be excluded from options
expectType<string>(base.options.version);

// @ts-expect-error unknown properties cannot be used, see #31
base.unknown;

const FooBase = Base.plugin(fooPlugin).defaults({
  default: "value",
  version: "1.2.3",
});
const fooBase = new FooBase({
  option: "value",
});

expectType<string>(fooBase.options.default);
expectType<string>(fooBase.options.option);

// @ts-expect-error "version" is not set on .options
expectType<string>(fooBase.options.version);

expectType<string>(fooBase.foo);

const BaseWithVoidPlugin = Base.plugin(voidPlugin);
const baseWithVoidPlugin = new BaseWithVoidPlugin({
  version: "1.2.3",
});

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidPlugin.unknown;

const BaseWithFooAndBarPlugins = Base.plugin(barPlugin, fooPlugin);
const baseWithFooAndBarPlugins = new BaseWithFooAndBarPlugins({
  version: "1.2.3",
});

expectType<string>(baseWithFooAndBarPlugins.foo);
expectType<string>(baseWithFooAndBarPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithFooAndBarPlugins.unknown;

const BaseWithVoidAndNonVoidPlugins = Base.plugin(
  barPlugin,
  voidPlugin,
  fooPlugin
);
const baseWithVoidAndNonVoidPlugins = new BaseWithVoidAndNonVoidPlugins({
  version: "1.2.3",
});

expectType<string>(baseWithVoidAndNonVoidPlugins.foo);
expectType<string>(baseWithVoidAndNonVoidPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidAndNonVoidPlugins.unknown;

const BaseWithOptionsPlugin = Base.plugin(withOptionsPlugin);
const baseWithOptionsPlugin = new BaseWithOptionsPlugin();
expectType<string>(baseWithOptionsPlugin.getFooOption());

const BaseWithComplexPlugin = Base.plugin(complexPlugin);
const baseWithComplexPlugin = new BaseWithComplexPlugin({
  foo: "bar",
});

expectType<string>(baseWithComplexPlugin.complex.foo);
expectType<string>(baseWithComplexPlugin.complex.bar);
expectType<string>(baseWithComplexPlugin.complex.getFooOption());
