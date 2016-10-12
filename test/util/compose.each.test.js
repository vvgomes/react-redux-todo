import { composeEach } from "../../src/util/compose.each";
import { expect } from "chai";
import { spy } from "sinon";
import { identity } from "ramda";

describe("composeEach()", () => {
  it("composes each f in a list with a g", () => {
    const g = spy(); 
    const fs = { foo: identity, bar: identity };
    const composed = composeEach(fs, g);

    composed.foo("foo");
    expect(g.calledWith("foo")).ok;

    composed.bar("bar");
    expect(g.calledWith("bar")).ok;
  });
});


