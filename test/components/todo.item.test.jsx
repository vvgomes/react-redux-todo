import React from "react";
import TodoItem from "../../src/components/todo.item";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import { identity } from "ramda";

describe("TodoItem", () => {
  const todo = {
    id: "1",
    text:"wash dishes",
    completed: false
  };

  it("renders item description", () => {
    const todoItem = shallow(<TodoItem todo={todo} toggle={identity} />);
    const label = todoItem.find("li > label");

    expect(label.text()).eq("wash dishes");
  });

  it("renders checkbox", () => {
    const todoItem = shallow(<TodoItem todo={todo} toggle={identity} />);
    const checkbox = todoItem.find("li > input");

    expect(checkbox.prop("id")).eq("1");
    expect(checkbox.prop("checked")).eq(false);
  });

  it("triggers callback on change", () => {
    const toggle = spy();
    const todoItem = shallow(<TodoItem todo={todo} toggle={toggle} />);

    todoItem.find("li > input").simulate("change");
    expect(toggle.calledWith(todo)).ok;
  });
});
