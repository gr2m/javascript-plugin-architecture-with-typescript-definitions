# javascript-plugin-architecture-with-typescript-definitions

> Plugin architecture example with full TypeScript support

[![@latest](https://img.shields.io/npm/v/javascript-plugin-architecture-with-typescript-definitions.svg)](https://www.npmjs.com/package/javascript-plugin-architecture-with-typescript-definitions)
[![Build Status](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/workflows/Test/badge.svg)](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/actions/workflows/test.yml)

The goal of this repository is to provide a template of a simple plugin Architecture which allows plugins to created and authored as separate npm modules and shared as official or 3rd party plugins.

## Usage

[Try it in TypeScript's playground editor](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgIQIYGcCmcC+cBmUEIcARAFaoBuGAxlMGDALRgA2ArgObAB2zqKLQAWwGJlowOUTMwDuY4cxgBPMJnT1GLACaZ8fMcAi90pANwAoS-g69Jx3nBAqAYhAgAFTj14AKPnQYVHtMAC4UDEwASkRLODgZKSgnBHiEgg8Iv1iAXgA+MnwPUgAadJwrHGtbexhHZxU0KG9uPgDTYNCItCxYtISk6VT0hIAjQWy8wtIJqDKKqpq7BxM4DCxYAGUYBl4uP3QOMfIJGAigva5+6staEyC4dwgAFQ14XMisADp2Nv8XM9Wr5olZ7p1Mq93nBPrxMHInh43kEclYNphtrs+AdilCgt9cTlQdZwY9ns1kR8vphfj52oCPMC+KVGs0mbxiaT4LiKdDYfDERBeSjiejMVc-DzBJSCR4iWj0JsYDsJVKoDK5vKgA)

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

const FooTest = Base.plugin(myFooPlugin);
const fooTest = new FooTest();
fooTest.foo(); // has full TypeScript intellisense

const FooBarTest = Base.plugin(myFooPlugin, myBarPlugin);
const fooBarTest = new FooBarTest();
fooBarTest.foo(); // has full TypeScript intellisense
fooBarTest.bar(); // has full TypeScript intellisense
```

The constructor accepts an optional `options` object which is passed to the plugins as second argument and stored in `instance.options`. Default options can be set using `Base.defaults(options)`

```js
const BaseWithOptions = Base.defaults({ foo: "bar" });
const instance = new BaseWithOptions();
instance.options; // {foo: 'bar'}
```

### Defaults

TypeScript will not complain when chaining `.defaults()` calls endlessly: the static `.defaultOptions` property will be set correctly. However, when instantiating from a class with 4+ chained `.defaults()` calls, then only the defaults from the first 3 calls are supported. See [#57](https://github.com/gr2m/javascript-plugin-architecture-with-typescript-definitions/pull/57) for details.

## Credit

This plugin architecture was extracted from [`@octokit/core`](https://github.com/octokit/core.js). The implementation was made possible by help from [@karol-majewski](https://github.com/karol-majewski), [@dragomirtitian](https://github.com/dragomirtitian), and [StackOverflow user "hackape"](https://stackoverflow.com/a/58706699/206879).

## LICENSE

[ISC](LICENSE)
