import React from "react";
import { connect } from "react-redux";
import { pipe, tap } from "ramda";

const NewTodo = ({ add }) => {
  let input; 

  return (
    <form className="new-todo" onSubmit={
      pipe(
        tap(event => event.preventDefault()),
        () => ({ id: input.value, text: input.value }),
        add,
        tap(() => input.value = "") 
      )
    }>
      <input type="text" name="new-todo-text" ref={node => { input = node; }} />
      <button type="submit">+</button>
    </form>
  );
};

export default connect()(NewTodo);
