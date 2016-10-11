import React from "react";
import NewTodo from "../../src/components/new.todo";
import { mount } from 'enzyme';
import { expect } from "chai";
import { spy } from "sinon";
import { identity, always } from "ramda";

describe("TodoItem", () => {
  const fakeStore = {
    dispatch: identity,
    getState: always({}),
    subscribe: always()
  };

  it("renders a text input", () => {
    const newTodo = mount(<NewTodo add={identity} store={fakeStore} />);
    const input = newTodo.find("form > input");

    expect(input.prop("type")).eq("text");
    expect(input.prop("name")).eq("new-todo-text");
  });

  it("renders a submit button", () => {
    const newTodo = mount(<NewTodo add={identity} store={fakeStore} />);
    const button = newTodo.find("form > button");

    expect(button.prop("type")).eq("submit");
    expect(button.text()).eq("+");
  });


  it("triggers callback on submit", () => {
    const add = spy();
    const newTodo = mount(<NewTodo add={add} store={fakeStore} />);

    newTodo.find("form").simulate("submit");
    expect(add.called).ok;
  });
});
