import React from "react";
import { connect } from "react-redux";
import { pipe, tap } from "ramda";

const NewTodo = ({ add }) => {
  let input; 

  return (
    <form className="new-todo" onSubmit={
      event => {
        event.preventDefault();
        add({ text: input.value });
        input.value = "";
      }
    }>
      <input type="text" name="new-todo-text" ref={node => { input = node; }} />
      <button type="submit">+</button>
    </form>
  );
};

export default connect()(NewTodo);
