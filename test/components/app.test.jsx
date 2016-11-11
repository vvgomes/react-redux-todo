import React from "react";
import App from "../../src/components/app";
import TodoList from "../../src/components/todo.list";
import NewTodo from "../../src/components/new.todo";
import ErrorList from "../../src/components/error.list";
import { shallow } from "enzyme";
import { expect } from "chai";
import { identity, set, lensProp } from "ramda";

describe("App", () => {
  const state = {
    errors: [],
    todos: [
      { id: "1", text:"wash dishes", completed: true },
      { id: "2", text: "walk the dog", completed: false }
    ]
  };

  const actions = {
    addTodo: identity,
    toggleTodo: identity,
    dismissErrors: identity
  };

  it("renders todo list", () => {
    const app = shallow(<App state={state} actions={actions} />);
    const todoList = app.find(".app").find(TodoList) ;

    expect(todoList).lengthOf(1);
    expect(todoList.prop("todos")).eq(state.todos);
    expect(todoList.prop("toggle")).eq(actions.toggleTodo);
  });

  it("renders new todo form", () => {
    const app = shallow(<App state={state} actions={actions} />);
    const newTodo = app.find(".app").find(NewTodo);

    expect(newTodo.prop("add")).eq(actions.addTodo);
  });

  it("does not render error list when there are no errors", () => {
    const app = shallow(<App state={state} actions={actions} />);
    const errorList = app.find(".app").find(ErrorList) ;

    expect(errorList).lengthOf(0);
  });

  it("renders error list when there are errors", () => {
    const errors = [
      "Text description must be present.",
      "Text description must be unique."
    ];

    const stateWithErrors = set(lensProp("errors"), errors, state);
    const app = shallow(<App state={stateWithErrors} actions={actions} />);
    const errorList = app.find(".app").find(ErrorList) ;

    expect(errorList).lengthOf(1);
    expect(errorList.prop("errors")).eq(errors);
    expect(errorList.prop("dismiss")).eq(actions.dismissErrors);
  });
});
