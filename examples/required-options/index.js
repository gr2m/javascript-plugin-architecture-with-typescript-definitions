import { Base } from "../../index.js";

/**
 * @param {Base} base
 * @param {Base.Options} options
 */
function pluginRequiringOption(base, options) {
  if (!options.myRequiredUserOption) {
    throw new Error('Required option "myRequiredUserOption" missing');
  }
}

export const MyBase = Base.plugin(pluginRequiringOption);
