import { expectType } from "tsd";
import { Base } from "./index.js";

const fooPlugin = () => {
  return {
    foo: () => "foo",
  };
};

const MyBase = Base.plugin(fooPlugin).defaults({
  default: "value",
});
const base = new MyBase({
  option: "value",
});

expectType<string>(base.options.default);
expectType<string>(base.options.option);
expectType<string>(base.foo());

// @ts-expect-error unknown properties cannot be used, see #31
base.unknown;
