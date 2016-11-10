import defaultFetch from "isomorphic-fetch";
import { contains } from "ramda";

const createApiClient = (fetch = defaultFetch) => {
  const payload = data => ({
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const isSuccess = res =>
    contains(res.status)([200, 202])

  const handleResponse = res => 
    res.json().then(data => {
      if (isSuccess(res))
        return data;
      else
        throw data;
    });

  const fetchState = () =>
    fetch("/api/state").then(handleResponse);

  const addTodo = todo =>
    fetch("/api/actions", payload({ type: "addTodo", todo }))
      .then(handleResponse);

  const toggleTodo = todo =>
    fetch("/api/actions", payload({ type: "toggleTodo", todo }))
      .then(handleResponse);

  return { fetchState, addTodo, toggleTodo };
};

export default createApiClient;

