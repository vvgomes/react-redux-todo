import React from "react";

const TodoItem = ({ todo, toggle }) => (
  <li className="todo-item">
    <input
      type="checkbox"
      id={todo.id}
      checked={todo.completed}
      onChange={() => toggle(todo)}
    />
    <label
      htmlFor="#{todo.id}"
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
    >
      {todo.text}
    </label>
  </li>
);

export default TodoItem;
