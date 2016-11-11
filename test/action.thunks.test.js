import defineThunks from "../src/action.thunks";
import { expect } from "chai";
import { stub } from "sinon";
import { identity, always, assoc, __ } from "ramda";

describe("actionThunks{}", () => {
  const apiClient = {
    addTodo: stub(),
    toggleTodo: stub(),
    fetchState: stub()
  };

  const actionCreators = {
    presentTodos: assoc("todos", __, { type: "presentTodos" }),
    presentErrors: assoc("errors", __, { type: "presentErrors" }),
    dismissErrors: always({ type: "dismissErrors" })
  };

  let thunks;
  beforeEach(() => thunks = defineThunks(actionCreators, apiClient));

  const dispatch = identity();

  describe("addTodo()", () => {
    const todo = { text: "groceries" };

    it("dispatches presentTodos action after successful remote action", () => {
      const todos = [ assoc("id", "1", todo) ];

      apiClient.addTodo.withArgs(todo).returns(Promise.resolve(todo));
      apiClient.fetchState.returns(Promise.resolve({ todos }));

      return thunks.addTodo(todo)(dispatch).then(reloadTodos => {
        reloadTodos(dispatch).then(action => {
          expect(action).deep.eq({ type: "presentTodos", todos });
        });
      });
    });

    it("dispatches presentErrors action after failed remote action", () => {
      apiClient.addTodo.withArgs(todo).returns(Promise.reject([ "Error." ]));

      return thunks.addTodo(todo)(dispatch).then(action => {
        expect(action).deep.eq({ type: "presentErrors", errors: [ "Error." ] });
      });
    });
  });

  describe("toggleTodo()", () => {
    const todo = { id: "1", text: "groceries" };

    it("dispatches presentTodos action after successful remote action", () => {
      const todos = [ todo ];

      apiClient.toggleTodo.withArgs(todo).returns(Promise.resolve(todo));
      apiClient.fetchState.returns(Promise.resolve({ todos }));

      return thunks.toggleTodo(todo)(dispatch).then(reloadTodos => {
        reloadTodos(dispatch).then(action => {
          expect(action).deep.eq({ type: "presentTodos", todos });
        });
      });
    });

    it("dispatches presentErrors action after failed remote action", () => {
      apiClient.toggleTodo.withArgs(todo).returns(Promise.reject([ "Error." ]));

      return thunks.toggleTodo(todo)(dispatch).then(action => {
        expect(action).deep.eq({ type: "presentErrors", errors: [ "Error." ] });
      });
    });
  });

  describe("reloadTodos()", () => {
    it("dispatches presentTodos action after successfuly fetching state", () => {
      apiClient.fetchState.returns(Promise.resolve({ todos: [] }));

      return thunks.reloadTodos()(dispatch).then(action => {
        expect(action).deep.eq({ type: "presentTodos", todos: [] });
      });
    });

    it("dispatches presentErrors action after failed fetching state", () => {
      apiClient.fetchState.returns(Promise.reject([ "Error." ]));

      return thunks.reloadTodos()(dispatch).then(action => {
        expect(action).deep.eq({ type: "presentErrors", errors: [ "Error." ] });
      });
    });
  });

  describe("dismissErrors()", () => {
    it("dispatches dismissErrors action", () => {
      const action = thunks.dismissErrors()(dispatch);
      expect(action).deep.eq({ type: "dismissErrors" });
    });
  });
});

