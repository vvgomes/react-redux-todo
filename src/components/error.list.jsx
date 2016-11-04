import React from "react";
import { map } from "ramda";

const ErrorList = ({ errors }) => (
  <ul className="error-list">
    {
      map(error =>
        <li>
          <span className="error">
            error
          </span>
        </li>
      )(errors)
    }
  </ul>
);

export default ErrorList;
