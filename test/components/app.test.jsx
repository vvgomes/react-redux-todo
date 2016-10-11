import React from "react";
import App from "../../src/components/app";
import TodoList from "../../src/components/todo.list";
import NewTodo from "../../src/components/new.todo";
import { shallow } from "enzyme";
import { expect } from "chai";
import { identity } from "ramda";

describe("App", () => {
  const state = {
    todos: [
      { id: "1", text:"wash dishes", completed: true },
      { id: "2", text: "walk the dog", completed: false }
    ]
  };

  const actions = {
    addTodo: identity,
    toggleTodo: identity
  };

  it("renders todo list", () => {
    const app = shallow(<App state={state} actions={actions} />);
    const todoList = app.find(".app").find(TodoList) ;

    expect(todoList).to.have.lengthOf(1);
    expect(todoList.prop("todos")).eq(state.todos);
    expect(todoList.prop("toggle")).eq(actions.toggleTodo);
  });

  it("renders new todo form", () => {
    const app = shallow(<App state={state} actions={actions} />);
    const newTodo = app.find(".app").find(NewTodo);

    expect(newTodo.prop("add")).eq(actions.addTodo);
  });
});
