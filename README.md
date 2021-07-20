# javascript-plugin-architecture-with-typescript-definitions

> Plugin architecture example with full TypeScript support

[![@latest](https://img.shields.io/npm/v/javascript-plugin-architecture-with-typescript-definitions.svg)](https://www.npmjs.com/package/javascript-plugin-architecture-with-typescript-definitions)
[![Build Status](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/workflows/Test/badge.svg)](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/actions/workflows/test.yml)

The goal of this repository is to provide a template of a simple plugin Architecture which allows plugins to be created and authored as separate npm modules and shared as official or 3rd party plugins. It also permits the plugins to extend the types for the constructor options.

## Usage

[Try it in TypeScript's playground editor](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgIQIYGcCmcC+cBmUEIcARAFaoBuGAxlMGDALRgA2ArgObAB2zqKLQAWwGJlowOUTMwDuY4cxgBPMJnT1GLACaZ8fMcAi90pANwAoS-g69Jx3nBAqAYhAgAFTj14AKPnQYVHtMAC4UDEwASkRLODgZKSgnBHiEgg8Iv1iAXgA+MnwPUgAadJwrHGtbexhHZxU0KG9uPgDTYNCItCxYtISk6VT0hIAjQWy8wtIJqDKKqpq7BxM4DCxYAGUYBl4uP3QOMfIJGAigva5+6staEyC4dwgAFQ14XMisADoFGGFWr50H4ANouZ6AvgAXWiVnunUyr3ecE+vEwcieHjeQRyVg2mG2uz4B2KSKC31JOVh1nhj2ezWxHy+mF+ikhplB4I87NKjWa7JhcIe8FJDORqPRmIgYpx1PxhKuflFgkZFI8VLx6E2MB2iuVUFVcw1QA)

```ts
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

function myFooPlugin(instance: Base) {
  return {
    foo: () => "foo",
  };
}

function myBarPlugin(instance: Base) {
  return {
    bar: () => "bar",
  };
}

const FooTest = Base.withPlugins([myFooPlugin]);
const fooTest = new FooTest();
fooTest.foo(); // has full TypeScript intellisense

const FooBarTest = Base.withPlugins([myFooPlugin, myBarPlugin]);
const fooBarTest = new FooBarTest();
fooBarTest.foo(); // has full TypeScript intellisense
fooBarTest.bar(); // has full TypeScript intellisense
```

The constructor accepts an optional `options` object which is passed to the plugins as second argument and stored in `instance.options`. Default options can be set using `Base.withDefaults(options)`.

```js
const BaseWithOptions = Base.withDefaults({ foo: "bar" });
const instance = new BaseWithOptions();
instance.options; // {foo: 'bar'}
```

Note that in for TypeScript to recognize the new option, you have to extend the `Base.Option` intererface.

```ts
declare module "javascript-plugin-architecture-with-typescript-definitions" {
  namespace Base {
    interface Options {
      foo: string;
    }
  }
}
```

See also the [`required-options` example](examples/required-options).

The `Base` class also has two static properties

- `.defaults`: the default options for all instances
- `.plugins`: the list of plugins applied to all instances

When creating a new class with `.withPlugins()` and `.defaults()`, the static properties of the returned class are set accordingly.

```js
const MyBase = Base.withDefaults({ foo: "bar" });
```

### Defaults

TypeScript will not complain when chaining `.withDefaults()` calls endlessly: the static `.defaults` property will be set correctly. However, when instantiating from a class with 4+ chained `.withDefaults()` calls, then only the defaults from the first 3 calls are supported. See [#57](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/pull/57) for details.

## Credit

This plugin architecture was extracted from [`@octokit/core`](https://github.com/octokit/core.js). The implementation was made possible by help from [@karol-majewski](https://github.com/karol-majewski), [@dragomirtitian](https://github.com/dragomirtitian), [StackOverflow user "hackape"](https://stackoverflow.com/a/58706699/206879), and [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg).

## LICENSE

[ISC](LICENSE)
