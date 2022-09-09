import { expectType } from "tsd";
import { Base } from "../..";

import { BaseWithDefaultsAndPlugins } from "./index.js";
import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options/index.js";

export async function test() {
  // @ts-expect-error - options are required
  new BaseWithDefaultsAndPlugins();

  // @ts-expect-error - bar option is required
  new BaseWithDefaultsAndPlugins({});

  const octokit = new BaseWithDefaultsAndPlugins({
    optional: "foo",
    required: "bar",
  });

  const fooResult = await octokit.foo();
  expectType<string>(fooResult);

  expectType<() => Promise<string>>(octokit.foo);
  expectType<string>(octokit.bar);
  expectType<string>(octokit.getOptionalOption());
  expectType<string>(octokit.getRequriedOption());

  // multi-layered chainging of .withDefaults().withPlugins()

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

  const octokitLevelOne = new BaseLevelOne({
    optionOne: "value",
  });

  expectType<string>(octokitLevelOne.options.defaultOne);
  expectType<string>(octokitLevelOne.options.optionOne);
  expectType<string>(octokitLevelOne.options.required);
  // @ts-expect-error unknown properties cannot be used, see #31
  octokitLevelOne.unknown;

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

  const octokitLevelTwo = new BaseLevelTwo({
    optionTwo: true,
  });

  expectType<number>(octokitLevelTwo.options.defaultTwo);
  expectType<string>(octokitLevelTwo.options.defaultOne);
  expectType<boolean>(octokitLevelTwo.options.optionTwo);
  expectType<string>(octokitLevelTwo.options.required);
  // @ts-expect-error unknown properties cannot be used, see #31
  octokitLevelTwo.unknown;

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

  const octokitLevelThree = new BaseLevelThree({
    optionThree: [0, 1, 2],
  });

  expectType<string>(octokitLevelThree.options.defaultOne);
  expectType<number>(octokitLevelThree.options.defaultTwo);
  expectType<string[]>(octokitLevelThree.options.defaultThree);
  expectType<number[]>(octokitLevelThree.options.optionThree);
  expectType<string>(octokitLevelThree.options.required);
  // @ts-expect-error unknown properties cannot be used, see #31
  octokitLevelThree.unknown;

  const BaseWithVoidPlugin = Base.withPlugins([voidPlugin]);
  const octokitWithVoidPlugin = new BaseWithVoidPlugin({
    required: "1.2.3",
  });

  // @ts-expect-error unknown properties cannot be used, see #31
  octokitWithVoidPlugin.unknown;

  const BaseWithFooAndBarPlugins = Base.withPlugins([barPlugin, fooPlugin]);
  const octokitWithFooAndBarPlugins = new BaseWithFooAndBarPlugins({
    required: "1.2.3",
  });

  expectType<() => Promise<string>>(octokitWithFooAndBarPlugins.foo);
  expectType<string>(octokitWithFooAndBarPlugins.bar);

  // @ts-expect-error unknown properties cannot be used, see #31
  octokitWithFooAndBarPlugins.unknown;

  const BaseWithVoidAndNonVoidPlugins = Base.withPlugins([
    barPlugin,
    voidPlugin,
    fooPlugin,
  ]);
  const octokitWithVoidAndNonVoidPlugins = new BaseWithVoidAndNonVoidPlugins({
    required: "1.2.3",
  });

  expectType<() => Promise<string>>(octokitWithVoidAndNonVoidPlugins.foo);
  expectType<string>(octokitWithVoidAndNonVoidPlugins.bar);

  // @ts-expect-error unknown properties cannot be used, see #31
  octokitWithVoidAndNonVoidPlugins.unknown;

  const BaseWithOptionsPlugin = Base.withPlugins([withOptionsPlugin]);
  const octokitWithOptionsPlugin = new BaseWithOptionsPlugin({
    required: "1.2.3",
  });

  expectType<string>(octokitWithOptionsPlugin.getOptionalOption());

  // Test depth limits of `.withDefaults()` chaining
  const BaseLevelFour = BaseLevelThree.withDefaults({ defaultFour: 4 });

  expectType<{
    required: string;
    defaultOne: string;
    defaultTwo: number;
    defaultThree: string[];
    defaultFour: number;
  }>({ ...BaseLevelFour.defaults });

  const octokitLevelFour = new BaseLevelFour();

  // See the note on static defaults in index.d.ts for why defaultFour is missing
  expectType<{
    required: string;
    defaultOne: string;
    defaultTwo: number;
    defaultThree: string[];
    defaultFour: number;
    // @ts-expect-error - .options from .withDefaults() is only supported until a depth of 4
  }>({ ...octokitLevelFour.options });

  expectType<{
    required: string;
    defaultOne: string;
    defaultTwo: number;
    defaultThree: string[];
    defaultFour: number;
    // @ts-expect-error - .options from .withDefaults() is only supported until a depth of 4
  }>({ ...octokitLevelFour.options });

  const BaseWithChainedDefaultsAndPlugins = Base.withDefaults({
    defaultOne: "value",
  })
    .withPlugins([fooPlugin])
    .withDefaults({
      defaultTwo: 0,
    });

  const octokitWithChainedDefaultsAndPlugins =
    new BaseWithChainedDefaultsAndPlugins({
      required: "1.2.3",
    });

  expectType<() => Promise<string>>(octokitWithChainedDefaultsAndPlugins.foo);

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

  const octokitWithManyChainedDefaultsAndPlugins =
    new BaseWithManyChainedDefaultsAndPlugins({
      required: "1.2.3",
      foo: "bar",
    });

  expectType<() => Promise<string>>(
    octokitWithManyChainedDefaultsAndPlugins.foo
  );
  expectType<string>(octokitWithManyChainedDefaultsAndPlugins.bar);
  expectType<string>(
    octokitWithManyChainedDefaultsAndPlugins.getOptionalOption()
  );
}
