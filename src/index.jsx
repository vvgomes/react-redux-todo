import React from "react";
import { createStore } from "redux";
import { defineReducer } from "redux-definer";
import { connect, Provider } from "react-redux";
import { render } from "react-dom";
import { objOf, compose } from "ramda";
import { composeEach } from "./util/compose.each";
import * as actionHandlers from "./action.handlers";
import * as actionCreators from "./action.creators";
import App from "./components/app";

const fakeState = {
  todos: [
    {
      id: "1",
      text:"wash dishes",
      completed: true
    },
    {
      id: "2",
      text: "walk the dog",
      completed: false
    }
  ]
};

const reducer = defineReducer(actionHandlers);
const store = createStore(reducer, fakeState);
store.subscribe(() => console.log("Beep!"));

const mapStateToProps = objOf("state");
const mapDispatchToProps = compose(objOf("actions"), composeEach(actionCreators));

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app")
);
