import React from "react";
import ErrorList from "../../src/components/error.list";
import ErrorItem from "../../src/components/error.item";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import { map, identity } from "ramda";

describe("ErrorList", () => {
  const errors = [
    "Text description must be present.",
    "Text description must be unique."
  ];

  it("renders error items", () => {
    const errorList = shallow(<ErrorList errors={errors} dismiss={identity} />);
    expect(errorList.find(ErrorItem)).lengthOf(2);
  });

  it("renders dismiss button", () => {
    const dismiss = identity;
    const errorList = shallow(<ErrorList errors={errors} dismiss={dismiss} />);
    const button = errorList.find("button");

    expect(button).lengthOf(1);
    expect(button.text()).eq("Dismiss");
  });

  it("triggers callback on dismiss", () => {
    const dismiss = spy();
    const errorList = shallow(<ErrorList errors={errors} dismiss={dismiss} />);
    const button = errorList.find("button");

    button.simulate("click");
    expect(dismiss.called).ok;
  });
});
