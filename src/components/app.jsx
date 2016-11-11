import React from "react";
import TodoList from "./todo.list";
import NewTodo from "./new.todo";
import ErrorList from "./error.list";
import { when, pipe, isEmpty, not, always } from "ramda";

const App = ({ state, actions }) => (
  <div className="app">
    {
      when(pipe(isEmpty, not), always(
        <ErrorList errors={state.errors} dismiss={actions.dismissErrors} />
      ))(state.errors)
    }
    <NewTodo add={actions.addTodo} />
    <TodoList todos={state.todos} toggle={actions.toggleTodo} />
  </div>
);

export default App;
