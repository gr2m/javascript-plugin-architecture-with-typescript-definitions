import { expectType } from "tsd";
import { Base } from "./index.js";

import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options";

const base = new Base({
  version: "1.2.3",
});

// @ts-expect-error unknown properties cannot be used, see #31
base.unknown;

const BaseWithEmptyDefaults = Base.defaults({
  // there should be no required options
});

// 'version' is missing and should still be required
// @ts-expect-error
new BaseWithEmptyDefaults()

// 'version' is missing and should still be required
// @ts-expect-error
new BaseWithEmptyDefaults({})

const BaseLevelOne = Base.plugin(fooPlugin).defaults({
  defaultOne: "value",
  version: "1.2.3",
});

// Because 'version' is already provided, this needs no argument
new BaseLevelOne();
new BaseLevelOne({});

expectType<{
  defaultOne: string,
  version: string,
}>(BaseLevelOne.defaultOptions);

const baseLevelOne = new BaseLevelOne({
  optionOne: "value",
});

expectType<string>(baseLevelOne.options.defaultOne);
expectType<string>(baseLevelOne.options.optionOne);
expectType<string>(baseLevelOne.options.version);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelOne.unknown;

const BaseLevelTwo = BaseLevelOne.defaults({
  defaultTwo: 0,
});

expectType<{
  defaultOne: string,
  defaultTwo: number,
  version: string,
}>(BaseLevelTwo.defaultOptions);

// Because 'version' is already provided, this needs no argument
new BaseLevelTwo();
new BaseLevelTwo({});

// 'version' may be overriden, though it's not necessary
new BaseLevelTwo({
  version: 'new version',
});

const baseLevelTwo = new BaseLevelTwo({
  optionTwo: true
});

expectType<number>(baseLevelTwo.options.defaultTwo);
expectType<string>(baseLevelTwo.options.defaultOne);
expectType<boolean>(baseLevelTwo.options.optionTwo);
expectType<string>(baseLevelTwo.options.version);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelTwo.unknown;

const BaseLevelThree = BaseLevelTwo.defaults({
  defaultThree: ['a', 'b', 'c'],
});

expectType<{
  defaultOne: string,
  defaultTwo: number,
  defaultThree: string[],
  version: string,
}>(BaseLevelThree.defaultOptions);

// Because 'version' is already provided, this needs no argument
new BaseLevelThree();
new BaseLevelThree({});

// Previous settings may be overriden, though it's not necessary
new BaseLevelThree({
  optionOne: '',
  optionTwo: false,
  version: 'new version',
});

const baseLevelThree = new BaseLevelThree({
  optionThree: [0, 1, 2]
});

expectType<string>(baseLevelThree.options.defaultOne);
expectType<number>(baseLevelThree.options.defaultTwo);
expectType<string[]>(baseLevelThree.options.defaultThree);
expectType<number[]>(baseLevelThree.options.optionThree);
expectType<string>(baseLevelThree.options.version);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelThree.unknown;

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
const baseWithOptionsPlugin = new BaseWithOptionsPlugin({
  version: "1.2.3",
});

expectType<string>(baseWithOptionsPlugin.getFooOption());

