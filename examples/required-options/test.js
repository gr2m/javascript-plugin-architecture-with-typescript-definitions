import { test } from "uvu";
import * as assert from "uvu/assert";

import { MyBase } from "./index.js";

test("new MyBase()", () => {
  assert.throws(() => new MyBase());
});

test("new MyBase({})", () => {
  assert.throws(() => new MyBase({}));
});

test('new MyBase({ myRequiredUserOption: ""})', () => {
  assert.not.throws(() => new MyBase({ myRequiredUserOption: "" }));
});

test.run();
