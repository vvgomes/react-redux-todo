import { evolve, always, identity } from "ramda";

export const presentTodos = (state, action) =>
  evolve({
    todos: always(action.todos),
    errors: identity
  })(state);

export const presentErrors = (state, action) =>
  evolve({
    todos: identity,
    errors: always(action.errors)
  })(state);
