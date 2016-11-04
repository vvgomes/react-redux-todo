import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { defineReducer } from "redux-definer";
import { connect, Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import defineThunks from "./action.thunks";
import * as handlers from "./action.handlers";
import App from "./components/app";
import { map, compose } from "ramda";

const thunks = defineThunks();
const reducer = defineReducer(handlers);
const initialState = { todos: [], errors: [] };
const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log("Beep!"));
store.dispatch(thunks.reloadTodos());

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  actions: map(thunk => compose(dispatch, thunk), thunks)
});

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
