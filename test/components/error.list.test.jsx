import React from "react";
import ErrorList from "../../src/components/error.list";
import { shallow } from "enzyme";
import { expect } from "chai";
import { identity } from "ramda";

describe("ErrorList", () => {
  const errors = [
    "Text description must be present.",
    "Text description must be unique."
  ];

  it("renders errors", () => {
    const errorList = shallow(<ErrorList errors={errors} />);
    expect(errorList.find(".error")).lengthOf(2);
  });
});
