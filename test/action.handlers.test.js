import { presentTodos, presentErrors, dismissErrors } from "../src/action.handlers";
import { expect } from "chai";

describe("actionHandlers{}", () => {
  const state = {
    errors: ["Error occurred previously."],
    todos: [
      {
        id: "1",
        text: "wash dishes"
      }
    ]
  };

  describe("presentTodos()", () => {
    it("replaces the list of todos", () => {
      const action = {
        type: "presentTodos",
        todos: [
          {
            id: "2",
            text: "take trash out"
          }
        ]
      };

      const newState = presentTodos(state, action);

      expect(newState).deep.eq({
        errors: [],
        todos: [
          {
            id: "2",
            text: "take trash out"
          }
        ]
      });
    });
  });

  describe("presentErrors()", () => {
    it("replaces the list of errors", () => {
      const action = {
        type: "presentErrors",
        errors: ["Unable to connect to server."]
      };

      const newState = presentErrors(state, action);

      expect(newState).deep.eq({
        errors: ["Unable to connect to server."],
        todos: [
          {
            id: "1",
            text: "wash dishes"
          }
        ]
      });
    });
  });

  describe("dismissErrors()", () => {
    it("clears the list of errors", () => {
      const action = {
        type: "dismissErrors"
      };

      const newState = dismissErrors(state, action);

      expect(newState).deep.eq({
        errors: [],
        todos: [
          {
            id: "1",
            text: "wash dishes"
          }
        ]
      });
    });
  });
});
