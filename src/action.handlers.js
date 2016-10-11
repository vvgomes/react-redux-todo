import { evolve, append, map, when, propEq, not } from "ramda";

export const addTodo = (state, action) =>
  evolve({
    todos: append({
      id: action.todo.id,
      text: action.todo.text,
      completed: false
    })
  })(state);


export const toggleTodo = (state, action) =>
  evolve({
    todos: map(when(
      propEq("id", action.todo.id),
      evolve({ completed: not })
    ))
  })(state);
