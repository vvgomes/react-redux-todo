import React from "react";
import TodoList from "../../src/components/todo.list";
import TodoItem from "../../src/components/todo.item";
import { shallow } from "enzyme";
import { expect } from "chai";
import { identity } from "ramda";

describe("TodoList", () => {
  const todos = [
    { id: "1", text:"wash dishes", completed: true },
    { id: "2", text: "walk the dog", completed: false }
  ];

  it("renders items", () => {
    const todoList = shallow(<TodoList todos={todos} toggle={identity} />);
    expect(todoList.find(TodoItem)).lengthOf(2);
  });
});
