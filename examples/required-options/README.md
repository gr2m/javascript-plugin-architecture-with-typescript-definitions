# required options Example

`Base` has no required options by default, so the following code has no type errors.

```js
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

const base1 = new Base();
const base2 = new Base({});
```

But required options can be added by extending the `Base.Options` interface.

```ts
declare module "javascript-plugin-architecture-with-typescript-definitions" {
  namespace Base {
    interface Options {
      myRequiredUserOption: string;
    }
  }
}
```

With that extension, the same code will have a type error

```ts
// TS Error: Property 'myRequiredUserOption' is missing in type '{}' but required in type 'Options'
const base = new Base({});
```

Extending the `Base.Options` interface is useful to plugin developers, as options are passed as second argument to a plugin function.

```ts
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

declare module "javascript-plugin-architecture-with-typescript-definitions" {
  namespace Base {
    interface Options {
      myPluginOption: string;
    }
  }
}

export function myPlugin(base: Base, options: Base.Options) {
  options.myPluginOption; // is now typed as `string`
}
```

And users of the plugin will get a type error if they don't set `myPluginOption` on the instructor.
