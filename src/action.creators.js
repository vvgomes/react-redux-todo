export const presentTodos = todos => (
  { type: "presentTodos", todos }
);

export const presentErrors = errors => (
  { type: "presentErrors", errors }
);

export const dismissErrors = () => (
  { type: "dismissErrors" }
);

