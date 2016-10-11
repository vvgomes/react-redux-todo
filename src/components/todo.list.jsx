import React from "react";
import TodoItem from "./todo.item";
import { map } from "ramda";

const TodoList = ({ todos, toggle }) => (
  <ul className="todo-list">
    {
      map(todo =>
        <TodoItem
          key={todo.id}
          todo={todo}
          toggle={toggle}
        />
      )(todos)
    }
  </ul>
);

export default TodoList;
