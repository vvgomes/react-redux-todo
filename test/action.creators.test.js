import { addTodo, toggleTodo } from "../src/action.creators";
import { expect } from "chai";

describe("actionCreators{}", () => {
  describe("addTodo()", () => {
    const action = addTodo({ text: "wash dishes" });

    it("has action type", () => {
      expect(action).property("type", "addTodo");
    });

    it("has todo data", () => {
      expect(action).deep.property("todo.text", "wash dishes");
    });
  });

  describe("toggleTodo()", () => {
    const action = toggleTodo({ id: "666" });

    it("has action type", () => {
      expect(action).property("type", "toggleTodo");
    });

    it("has todo data", () => {
      expect(action).deep.property("todo.id", "666");
    });
  });
});

