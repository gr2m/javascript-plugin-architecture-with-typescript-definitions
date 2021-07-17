import { MyBase } from "./index.js";

// @ts-expect-error - An argument for 'options' was not provided
new MyBase();

// @ts-expect-error - Type '{}' is missing the following properties from type 'Options': myRequiredUserOption
new MyBase({});

new MyBase({
  myRequiredUserOption: "",
});
