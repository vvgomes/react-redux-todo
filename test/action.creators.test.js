import { presentTodos, presentErrors } from "../src/action.creators";
import { expect } from "chai";

describe("actionCreators{}", () => {
  describe("presentTodos()", () => {
    const action = presentTodos([{ id: "1", text: "wash dishes" }]);

    it("has action type", () => {
      expect(action.type).eq("presentTodos");
    });

    it("has a list of todo items", () => {
      expect(action.todos).deep.eq([{ id: "1", text: "wash dishes" }]);
    });
  });

  describe("presentErrors()", () => {
    const action = presentErrors(["Unable to connect to server."]);

    it("has action type", () => {
      expect(action.type).eq("presentErrors");
    });

    it("has a list of errors", () => {
      expect(action.errors).deep.eq(["Unable to connect to server."]);
    });
  });
});

