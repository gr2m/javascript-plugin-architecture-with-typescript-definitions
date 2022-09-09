// @ts-check

import { Base } from "../../";

import { fooPlugin } from "./plugins/foo/index.js";
import { barPlugin } from "./plugins/bar/index.js";
import { voidPlugin } from "./plugins/void/index.js";
import { withOptionsPlugin } from "./plugins/with-options/index.js";

export const BaseWithDefaultsAndPlugins = Base.withPlugins([
  fooPlugin,
  barPlugin,
  voidPlugin,
  withOptionsPlugin,
]).withDefaults({
  userAgent: "BaseWithDefaultsAndPlugins/1.0.0",
});
