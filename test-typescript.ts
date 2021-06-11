// ************************************************************
// THIS CODE IS NOT EXECUTED. IT IS JUST FOR TYPECHECKING
// ************************************************************

import { Base } from "./index";

function isString(what: string) {}

// sets .options types from constructor options
const base = new Base({ option: "value" });
isString(base.options.option);

// sets .options types from Base.defaults({})
const BaseWithDefaults = Base.defaults({ parentOption: "value" });
const baseWithDefaults = new BaseWithDefaults({ childOption: "value" });

isString(baseWithDefaults.options.childOption);
// see #32
isString(baseWithDefaults.options.parentOption);

// @ts-expect-error see #31
baseWithDefaults.unknown;
