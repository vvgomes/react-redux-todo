import createApiClient from "./api.client";
import * as defaultActions from "./action.creators";
import { prop ,pipe,tap} from "ramda";

const defineThunks = (
  apiClient = createApiClient(),
  actions = defaultActions
) => {
  const { presentTodos, presentErrors } = actions;

  const reloadTodos = () =>
    (dispatch, getState) =>
      apiClient
        .fetchState()
        .then(prop("todos"))
        .then(presentTodos)
        .catch(presentErrors)
        .then(dispatch);

  const addTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .addTodo(todo)
        .then(reloadTodos)
        .catch(presentErrors)
        .then(dispatch);

  const toggleTodo = todo =>
    (dispatch, getState) =>
      apiClient
        .toggleTodo(todo)
        .then(reloadTodos)
        .catch(presentErrors)
        .then(dispatch);

  return { reloadTodos, addTodo, toggleTodo };
};

export default defineThunks;

