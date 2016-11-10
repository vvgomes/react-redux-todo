import React from "react";
import ErrorItem from "../../src/components/error.item";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import { identity } from "ramda";

describe("ErrorItem", () => {
  it("renders error message", () => {
    const error = "Text description must be present.";
    const errorItem = shallow(<ErrorItem error={error} />);
    const span = errorItem.find("li > span");
    expect(span.text()).eq("Text description must be present.");
  });
});
