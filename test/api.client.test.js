import createApiClient from "../src/api.client";
import { expect } from "chai";
import { spy } from "sinon";

describe("apiClient{}", () => {
  const fetchArgs = {};
  const fetchRes = { json: spy() }
  const fetch = fakeFetch(fetchRes, fetchArgs);
  const client = createApiClient(fetch);

  describe("addTodo()", () => {
    it("sends addTodo action", () => {
      client.addTodo({ text: "foo" });

      const expectedRemoteAction = {
        type: "addTodo",
        todo: { text: "foo" }
      };

      const expectedPayload = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expectedRemoteAction)
      };

      expect(fetchArgs.url).eq("/api/actions");
      expect(fetchArgs.payload).deep.eq(expectedPayload);
    });
  });

  describe("toggleTodo()", () => {
    it("sends toggleTodo action", () => {
      client.toggleTodo({ id: "1" });

      const expectedRemoteAction = {
        type: "toggleTodo",
        todo: { id: "1" }
      };

      const expectedPayload = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expectedRemoteAction)
      };

      expect(fetchArgs.url).eq("/api/actions");
      expect(fetchArgs.payload).deep.eq(expectedPayload);
    });
  });

  describe("fetchState()", () => {
    it("retrieves the server side state", () => {
      client.fetchState();
      expect(fetchArgs.url).eq("/api/state");
      expect(fetchRes.json.called).ok;
    });
  });

  function fakeFetch(res, captor) {
    return (...args) => {
      captor.url = args[0];
      captor.payload = args[1];
      return { then: cb => cb(res) };
    }
  }
});

