import { Base } from "../../index.js";

/**
 * @param {Base} base
 * @param {Base.Options} options
 */
function pluginRequiringOption(base, options) {
  if (typeof options.myRequiredUserOption !== "string") {
    throw new Error('Required option "myRequiredUserOption" missing');
  }
}

export const MyBase = Base.plugin(pluginRequiringOption);
