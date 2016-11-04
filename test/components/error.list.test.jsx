import React from "react";
import ErrorList from "../../src/components/error.list";
import { shallow } from "enzyme";
import { expect } from "chai";
import { map } from "ramda";

describe("ErrorList", () => {
  const errors = [
    "Text description must be present.",
    "Text description must be unique."
  ];

  it("renders errors", () => {
    const errorList = shallow(<ErrorList errors={errors} />);
    const messages = map(e => e.text())(errorList.find(".error"))

    expect(messages).deep.eq([
      "Text description must be present.",
      "Text description must be unique."
    ]);
  });
});
