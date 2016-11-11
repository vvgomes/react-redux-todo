import createApiClient from "./api.client";
import * as defaultActions from "./action.creators";
import { prop } from "ramda";

const defineThunks = (
  actions = defaultActions,
  apiClient = createApiClient()
) => {
  const reloadTodos = () =>
    (dispatch, getState) =>
      apiClient
        .fetchState()
        .then(prop("todos"))
        .then(actions.presentTodos)
        .catch(actions.presentErrors)
        .then(dispatch);

  const addTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .addTodo(todo)
        .then(reloadTodos)
        .catch(actions.presentErrors)
        .then(dispatch);

  const toggleTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .toggleTodo(todo)
        .then(reloadTodos)
        .catch(actions.presentErrors)
        .then(dispatch);

  const dismissErrors = () =>
    (dispatch, getState) =>
      dispatch(actions.dismissErrors());

  return { reloadTodos, addTodo, toggleTodo, dismissErrors };
};

export default defineThunks;

