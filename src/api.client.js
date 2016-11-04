import defaultFetch from "isomorphic-fetch";

const createApiClient = (fetch = defaultFetch) => {
  const payload = data => ({
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const addTodo = todo =>
    fetch("/api/actions", payload({ type: "addTodo", todo }));

  const toggleTodo = todo =>
    fetch("/api/actions", payload({ type: "toggleTodo", todo }));

  const fetchState = () =>
    fetch("/api/state").then(res => res.json());

  return { fetchState, addTodo, toggleTodo };
};

export default createApiClient;

