import createApiClient from "../src/api.client";
import { expect } from "chai";
import { stub, match } from "sinon";

describe("apiClient{}", () => {
  describe("fetchState()", () => {
    it("retrieves the server side state", () => {
      const fetch = stub()
        .withArgs("/api/state")
        .returns(buildResponse(200, { todos: [] }))

      const client = createApiClient(fetch);

      client.fetchState().then(state => {
        expect(state).deep.eq({ todos: [] });
      });
    });
  });

  describe("addTodo()", () => {
    it("sends addTodo action successfully", () => {
      const action = {
        type: "addTodo",
        todo: { text: "foo" }
      };
  
      const fetch = stub()
        .withArgs("/api/actions", buildPayload(action))
        .returns(buildResponse(202, action))

      const client = createApiClient(fetch);

      client.addTodo({ text: "foo" }).then(action => {
        expect(action).deep.eq({
          type: "addTodo",
          todo: { text: "foo" }
        });
      });
    });

    it("results in errors for failed addTodo action", () => {
      const action = {
        type: "addTodo",
        todo: { text: "" }
      };
  
      const errors = [
        "Text description must be present."
      ];

      const fetch = stub()
        .withArgs("/api/actions", buildPayload(action))
        .returns(buildResponse(400, errors))
      
      const client = createApiClient(fetch);

      client.addTodo({ text: "" }).catch(errors => {
        expect(errors).deep.eq([
          "Text description must be present."
        ]);
      });
    });
  });

  describe("toggleTodo()", () => {
    it("sends toggleTodo action successfully", () => {
      const action = {
        type: "toggleTodo",
        todo: { id: "1" }
      };
  
      const fetch = stub()
        .withArgs("/api/actions", buildPayload(action))
        .returns(buildResponse(202, action))

      const client = createApiClient(fetch);

      client.toggleTodo({ id: "1" }).then(action => {
        expect(action).deep.eq({
          type: "toggleTodo",
          todo: { id: "1" }
        });
      });
    });

    it("results in errors for failed toggleTodo action", () => {
      const action = {
        type: "toggleTodo",
        todo: { id: "0" }
      };
  
      const errors = [
        "Todo not found."
      ];

      const fetch = stub()
        .withArgs("/api/actions", buildPayload(action))
        .returns(buildResponse(400, errors))
      
      const client = createApiClient(fetch);

      client.toggleTodo({ id: "0" }).catch(errors => {
        expect(errors).deep.eq([
          "Todo not found."
        ]);
      });
    });
  });


  function buildResponse(status, data) {
    return Promise.resolve({
      status, json: () => Promise.resolve(data)
    }); 
  }

  function buildPayload(data) {
    return match
      .has("method", "POST")
      .and(match.has("headers"))
      .and(match.has("body", JSON.stringify(data)));
  }
});

