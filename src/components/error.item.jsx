import React from "react";

const ErrorItem = ({ error }) => (
  <li className="error-item">
    <span className="error">
      {error}
    </span>
  </li>
);

export default ErrorItem;
