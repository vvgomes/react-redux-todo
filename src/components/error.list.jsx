import React from "react";
import ErrorItem from "./error.item";
import { map } from "ramda";

const ErrorList = ({ errors, dismiss }) => (
  <section className="error-list">
    <button onClick={dismiss}>Dismiss</button>
    <ul>
      {
        map(error =>
          <ErrorItem
            key={error}
            error={error}
          />
        )(errors)
      }
    </ul>
  </section>
);

export default ErrorList;
