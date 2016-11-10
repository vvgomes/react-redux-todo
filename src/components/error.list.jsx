import React from "react";
import ErrorItem from "./error.item";
import { map } from "ramda";

const ErrorList = ({ errors }) => (
  <ul className="error-list">
    {
      map(error =>
        <ErrorItem
          key={error}
          error={error}
        />
      )(errors)
    }
  </ul>
);

export default ErrorList;
