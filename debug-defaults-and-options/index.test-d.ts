import { expectType } from "tsd";
import { testWithDefaults } from "./index.js";

expectType<{ requiredOption: string }>(
  testWithDefaults(
    {
      requiredOption: "",
    },
    {}
  )
);
expectType<{ requiredOption: string }>(
  testWithDefaults({
    requiredOption: "",
  })
);
expectType<{ requiredOption: "" }>(
  testWithDefaults(
    {},
    {
      requiredOption: "",
    }
  )
);
expectType<{ requiredOption: string; default: string }>(
  testWithDefaults(
    {
      default: "",
      requiredOption: "",
    },
    {}
  )
);
expectType<{ requiredOption: string } & { option: string }>(
  testWithDefaults(
    {
      requiredOption: "",
    },
    {
      option: "",
    }
  )
);
expectType<{ requiredOption: string }>(
  testWithDefaults(
    {
      requiredOption: "",
    },
    {}
  )
);
expectType<{ requiredOption: string } & { optionalOption: ""; option: string }>(
  testWithDefaults(
    {
      requiredOption: "",
    },
    {
      optionalOption: "",
      option: "",
    }
  )
);

testWithDefaults(
  {},
  // @ts-expect-error - requiredOption is not defined in the options
  {}
);
testWithDefaults(
  // @ts-expect-error - requiredOption is not defined in the defaults, so options is required
  {}
);
