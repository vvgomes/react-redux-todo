import React from "react";
import TodoList from "./todo.list";
import NewTodo from "./new.todo";
import ErrorList from "./error.list";

const App = ({ state, actions }) => (
  <div className="app">
    <ErrorList errors={state.errors} />
    <NewTodo add={actions.addTodo} />
    <TodoList todos={state.todos} toggle={actions.toggleTodo} />
  </div>
);

export default App;
