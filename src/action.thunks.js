import createApiClient from "./api.client";
import * as defaultActions from "./action.creators";
import { prop, pipe } from "ramda";

const defineThunks = (
  actions = defaultActions,
  apiClient = createApiClient()
) => {
  const handleTodos = pipe(prop("todos"), actions.presentTodos);
  const handleErrors = pipe(prop("errors"), actions.presentErrors);

  const reloadTodos = () =>
    (dispatch, getState) =>
      apiClient
        .fetchState()
        .then(handleTodos)
        .catch(handleErrors)
        .then(dispatch);

  const addTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .addTodo(todo)
        .then(reloadTodos)
        .catch(handleErrors)
        .then(dispatch);

  const toggleTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .toggleTodo(todo)
        .then(reloadTodos)
        .catch(handleErrors)
        .then(dispatch);

  const dismissErrors = () =>
    (dispatch, getState) =>
      dispatch(actions.dismissErrors());

  return { reloadTodos, addTodo, toggleTodo, dismissErrors };
};

export default defineThunks;

