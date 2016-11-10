import React from "react";
import ErrorList from "../../src/components/error.list";
import ErrorItem from "../../src/components/error.item";
import { shallow } from "enzyme";
import { expect } from "chai";
import { map } from "ramda";

describe("ErrorList", () => {
  const errors = [
    "Text description must be present.",
    "Text description must be unique."
  ];

  it("renders error items", () => {
    const errorList = shallow(<ErrorList errors={errors} />);
    expect(errorList.find(ErrorItem)).lengthOf(2);
  });
});
