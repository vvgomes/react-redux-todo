import React from "react";
import TodoList from "./todo.list";
import NewTodo from "./new.todo";
import { keys } from "ramda";

const App = ({ state, actions }) => (
  <div className="app">
    <NewTodo add={actions.addTodo} />
    <TodoList todos={state.todos} toggle={actions.toggleTodo} />
  </div>
);

export default App;
