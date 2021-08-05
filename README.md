# javascript-plugin-architecture-with-typescript-definitions

> Plugin architecture example with full TypeScript support

[![@latest](https://img.shields.io/npm/v/javascript-plugin-architecture-with-typescript-definitions.svg)](https://www.npmjs.com/package/javascript-plugin-architecture-with-typescript-definitions)
[![Build Status](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/workflows/Test/badge.svg)](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/actions/workflows/test.yml)

The goal of this repository is to provide a template for a simple plugin Architecture which allows plugin authors to extend the base API as well as extend its constructor options. A custom class can be composed of the core Base class, a set of plugins and default options and distributed as new package, with full TypeScript for added APIs and constructor options.

## Usage

[Try it in TypeScript's playground editor](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgIQIYGcCmcC+cBmUEIcARAFaoBuGAxlMGDALRgA2ArgObAB2zqKLQAWwGJlowOUTMwDuY4cxgBPMJnT1GLACaZ8fMcAi90pANwAoS3tptB2EBB0c22CtToMmrTj36CImISUjLyispqGlo+ega8RiZmiJZwcLyoIBpgqLTYaFgpaWl84lD4udgA8kzGpkXFafgQEABccOgwDLxcVo04qbiWA5b4HLySdXAgKgBiLQAKfnwAFHydqBOY7QWYADRwELVJOxiYAHQ1MHXoAJQNMqG8DU0t7Sv3ALwAfIfHpudmhA4AAfEFkABGglIe0GOCsIzGE2uJmmKjQUCW3FW6xgmzypyw9wQg0e0meJMaUKg7y+v1I1JhcIR1loSXgAFl0Wc4J8UGdzgoYMIsf50CsANozeYQUV8A4zDFy3gAXVugsUABF9KhXDBxZSCG9IdDYThblZLGzTPBFTy+bxMHI4FzdiskED2gzUAAvUi4C2WO1YQEtD7mOAAekjHS6fC4Qe5Iep4ajMc63QTQA)

### Export new class `MyBase` with two plugins and default options:

```ts
// import the Base class
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

// import a set of plugins
import { myFooPlugin } from "@example/my-foo-plugin";
import { myBarPlugin } from "./my-bar-plugin";

export const MyBase = Base.withPlugins([myFooPlugin, myBarPlugin]).withDefaults(
  {
    foo: "bar",
  }
);
```

When importing `MyBase` and instantiating it, the `MyBase` constructor has type support for the new optional `foo` option as well as the `.foo()` and `.bar()` methods addded by the respective plugins.

```ts
import { MyBase } from "@example/my-base";

const myBase = new MyBase({
  // has full TypeScript intellisense
  foo: "bar",
});
myBase.foo(); // has full TypeScript intellisense
myBase.bar(); // has full TypeScript intellisense
```

### Create plugin which extends the API as well as the constructor options type

```js
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

declare module "javascript-plugin-architecture-with-typescript-definitions" {
  namespace Base {
    interface Options {
      foo?: string;
    }
  }
}

export function myFooPlugin(base: Base, options: Base.options) {
  return {
    foo() => options.foo || "bar",
  }
}
```

## API

### static `.withPlugins(plugins)`

Returns a new class with `.plugins` added to parent classes `.plugins` array. All plugins will be applied to instances.

### static `.withDefaults(options)`

Returns a new class with `.defaults` merged with the parent classes `.defaults` object. The defaults are applied to the options passed to the constructor when instantiated.

### static `.plugins`

`Base.plugins` is an empty array by default. It is extended on derived classes using `.withPlugins(plugins)`.

### static `.defaults`

`Base.defaults` is an empty object by default. It is extended on derived classes using `.withDefaults(plugins)`.

### Constructor

The constructor accepts one argument which is optional by default

```ts
new Base(options);
```

If the `Base.Options` interface has been extended with required keys, then the `options` argument becomes required, and all required `Base.Options` keys must be set.

### `.options`

The `.options` key is set on all instances. It's merged from from the constructor's `.defaults` object and the options passed to the constructor

```js
const BaseWithOptions = Base.withDefaults({ foo: "bar" });
const instance = new BaseWithOptions();
instance.options; // {foo: 'bar'}
```

Note that in for TypeScript to recognize the new option, you have to extend the `Base.Option` intererface.

### Other instance propreties and methods

Instance properties and methods can be added using plugins. Example:

```ts
function myPlugin(base: Base, options: Base.options) {
  return {
    myMethod() {
      /* do something here */
    },
    myProperty: "", // set to something useful
  };
}
const MyBase = Base.plugins([myPlugin]);
const myBase = new MyBase();

// this method and property is now set
myBase.myMethod();
myBase.myProperty;
```

### TypeScript for a customized Base class

If you write your `d.ts` files by hand instead of generating them from TypeScript source code, you can use the `ExtendBaseWith` Generic to create a class with custom defaults and plugins. It can even inherit from another customized class.

```ts
import { Base, ExtendBaseWith } from "../../index.js";

import { myPlugin } from "./my-plugin.js";

export const MyBase: ExtendBaseWith<
  Base,
  {
    defaults: {
      myPluginOption: string;
    };
    plugins: [typeof myPlugin];
  }
>;

// support using the `MyBase` import to be used as a class instance type
export type MyBase = typeof MyBase;
```

The last line is important in order to make `MyBase` behave like a class type, making the following code possible:

```ts
import { MyBase } from "./index.js";

export async function testInstanceType(client: MyBase) {
  // types set correctly on `client`
  client.myPlugin({ myPluginOption: "foo" });
}
```

### Defaults

TypeScript will not complain when chaining `.withDefaults()` calls endlessly: the static `.defaults` property will be set correctly. However, when instantiating from a class with 4+ chained `.withDefaults()` calls, then only the defaults from the first 3 calls are supported. See [#57](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/pull/57) for details.

## Credit

This plugin architecture was extracted from [`@octokit/core`](https://github.com/octokit/core.js). The implementation was made possible by help from [@karol-majewski](https://github.com/karol-majewski), [@dragomirtitian](https://github.com/dragomirtitian), [StackOverflow user "hackape"](https://stackoverflow.com/a/58706699/206879), and [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg).

## LICENSE

[ISC](LICENSE)
