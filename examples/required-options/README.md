# required options Example

`Base` has no required options by default, so the following code has no type errors.

```js
import { Base } from "javascript-plugin-architecture-with-typescript-definitions";

const base1 = new Base();
const base2 = new Base({});
```

But required options can be added by extending the `Base.Optiions` interface.

```ts
declare module "javascript-plugin-architecture-with-typescript-definitions" {
  namespace Base {
    interface Options {
      myRequiredUserOption: string;
    }
  }
}
```

With that extension, the same code will have type a type error

```ts
// TS Error: Property 'myRequiredUserOption' is missing in type '{}' but required in type 'Options'
const base = new Base({});
```
