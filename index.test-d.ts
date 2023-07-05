import { expectType } from "tsd";
import { Base, ExtendBaseWith, Plugin } from "./index.js";

import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options";

declare module "./index.js" {
  namespace Base {
    interface Options {
      required: string;
    }
  }
}

const baseSatisfied = new Base({
  required: "1.2.3",
});

// @ts-expect-error unknown properties cannot be used, see #31
baseSatisfied.unknown;

const BaseWithEmptyDefaults = Base.withDefaults({
  // there should be no required options
});

// 'required' is missing and should still be required
// @ts-expect-error
new BaseWithEmptyDefaults();

// 'required' is missing and should still be required
// @ts-expect-error
new BaseWithEmptyDefaults({});

expectType<Plugin[]>(Base.plugins);

const BaseLevelOne = Base.withPlugins([fooPlugin]).withDefaults({
  defaultOne: "value",
  required: "1.2.3",
});

// Because 'required' is already provided, this needs no argument
new BaseLevelOne();
new BaseLevelOne({});

expectType<{
  defaultOne: string;
  required: string;
}>(BaseLevelOne.defaults);

const baseLevelOne = new BaseLevelOne({
  optionOne: "value",
});

expectType<string>(baseLevelOne.options.defaultOne);
expectType<string>(baseLevelOne.options.optionOne);
expectType<string>(baseLevelOne.options.required);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelOne.unknown;

const BaseLevelTwo = BaseLevelOne.withDefaults({
  defaultTwo: 0,
});

expectType<{
  defaultOne: string;
  defaultTwo: number;
  required: string;
}>({ ...BaseLevelTwo.defaults });

// Because 'required' is already provided, this needs no argument
new BaseLevelTwo();
new BaseLevelTwo({});

// 'required' may be overriden, though it's not necessary
new BaseLevelTwo({
  required: "new required",
});

const baseLevelTwo = new BaseLevelTwo({
  optionTwo: true,
});

expectType<number>(baseLevelTwo.options.defaultTwo);
expectType<string>(baseLevelTwo.options.defaultOne);
expectType<boolean>(baseLevelTwo.options.optionTwo);
expectType<string>(baseLevelTwo.options.required);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelTwo.unknown;

const BaseLevelThree = BaseLevelTwo.withDefaults({
  defaultThree: ["a", "b", "c"],
});

expectType<{
  defaultOne: string;
  defaultTwo: number;
  defaultThree: string[];
  required: string;
}>({ ...BaseLevelThree.defaults });

// Because 'required' is already provided, this needs no argument
new BaseLevelThree();
new BaseLevelThree({});

// Previous settings may be overriden, though it's not necessary
new BaseLevelThree({
  optionOne: "",
  optionTwo: false,
  required: "new required",
});

const baseLevelThree = new BaseLevelThree({
  optionThree: [0, 1, 2],
});

expectType<string>(baseLevelThree.options.defaultOne);
expectType<number>(baseLevelThree.options.defaultTwo);
expectType<string[]>(baseLevelThree.options.defaultThree);
expectType<number[]>(baseLevelThree.options.optionThree);
expectType<string>(baseLevelThree.options.required);
// @ts-expect-error unknown properties cannot be used, see #31
baseLevelThree.unknown;

const BaseWithVoidPlugin = Base.withPlugins([voidPlugin]);
const baseWithVoidPlugin = new BaseWithVoidPlugin({
  required: "1.2.3",
});

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidPlugin.unknown;

const BaseWithFooAndBarPlugins = Base.withPlugins([barPlugin, fooPlugin]);
const baseWithFooAndBarPlugins = new BaseWithFooAndBarPlugins({
  required: "1.2.3",
});

expectType<string>(baseWithFooAndBarPlugins.foo);
expectType<string>(baseWithFooAndBarPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithFooAndBarPlugins.unknown;

const BaseWithVoidAndNonVoidPlugins = Base.withPlugins([
  barPlugin,
  voidPlugin,
  fooPlugin,
]);
const baseWithVoidAndNonVoidPlugins = new BaseWithVoidAndNonVoidPlugins({
  required: "1.2.3",
});

expectType<string>(baseWithVoidAndNonVoidPlugins.foo);
expectType<string>(baseWithVoidAndNonVoidPlugins.bar);

// @ts-expect-error unknown properties cannot be used, see #31
baseWithVoidAndNonVoidPlugins.unknown;

const BaseWithOptionsPlugin = Base.withPlugins([withOptionsPlugin]);
const baseWithOptionsPlugin = new BaseWithOptionsPlugin({
  required: "1.2.3",
});

expectType<string>(baseWithOptionsPlugin.getFooOption());

// Test depth limits of `.withDefaults()` chaining
const BaseLevelFour = BaseLevelThree.withDefaults({ defaultFour: 4 });

expectType<{
  required: string;
  defaultOne: string;
  defaultTwo: number;
  defaultThree: string[];
  defaultFour: number;
}>({ ...BaseLevelFour.defaults });

const baseLevelFour = new BaseLevelFour();

// See the node on static defaults in index.d.ts for why defaultFour is missing
// .options from .withDefaults() is only supported until a depth of 4
expectType<{
  required: string;
  defaultOne: string;
  defaultTwo: number;
  defaultThree: string[];
}>({ ...baseLevelFour.options });

expectType<{
  required: string;
  defaultOne: string;
  defaultTwo: number;
  defaultThree: string[];
  defaultFour: number;
  // @ts-expect-error - .options from .withDefaults() is only supported until a depth of 4
}>({ ...baseLevelFour.options });

const BaseWithChainedDefaultsAndPlugins = Base.withDefaults({
  defaultOne: "value",
})
  .withPlugins([fooPlugin])
  .withDefaults({
    defaultTwo: 0,
  });

const baseWithChainedDefaultsAndPlugins = new BaseWithChainedDefaultsAndPlugins(
  {
    required: "1.2.3",
  },
);

expectType<string>(baseWithChainedDefaultsAndPlugins.foo);

const BaseWithManyChainedDefaultsAndPlugins = Base.withDefaults({
  defaultOne: "value",
})
  .withPlugins([fooPlugin, barPlugin, voidPlugin])
  .withDefaults({
    defaultTwo: 0,
  })
  .withPlugins([withOptionsPlugin])
  .withDefaults({
    defaultThree: ["a", "b", "c"],
  });

expectType<{
  defaultOne: string;
  defaultTwo: number;
  defaultThree: string[];
}>({ ...BaseWithManyChainedDefaultsAndPlugins.defaults });

const baseWithManyChainedDefaultsAndPlugins =
  new BaseWithManyChainedDefaultsAndPlugins({
    required: "1.2.3",
    foo: "bar",
  });

expectType<string>(baseWithManyChainedDefaultsAndPlugins.foo);
expectType<string>(baseWithManyChainedDefaultsAndPlugins.bar);
expectType<string>(baseWithManyChainedDefaultsAndPlugins.getFooOption());

declare const RestApiClient: ExtendBaseWith<
  Base,
  {
    defaults: {
      defaultValue: string;
    };
    plugins: [
      () => { pluginValueOne: number },
      () => { pluginValueTwo: boolean },
    ];
  }
>;

expectType<string>(RestApiClient.defaults.defaultValue);

// @ts-expect-error
RestApiClient.defaults.unexpected;

expectType<number>(RestApiClient.pluginValueOne);
expectType<boolean>(RestApiClient.pluginValueTwo);

// @ts-expect-error
RestApiClient.unexpected;

declare const MoreDefaultRestApiClient: ExtendBaseWith<
  typeof RestApiClient,
  {
    defaults: {
      anotherDefaultValue: number;
    };
  }
>;

expectType<string>(MoreDefaultRestApiClient.defaults.defaultValue);
expectType<number>(MoreDefaultRestApiClient.defaults.anotherDefaultValue);

declare const MorePluginRestApiClient: ExtendBaseWith<
  typeof MoreDefaultRestApiClient,
  {
    plugins: [() => { morePluginValue: string[] }];
  }
>;

expectType<string[]>(MorePluginRestApiClient.morePluginValue);
