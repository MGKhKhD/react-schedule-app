import React from "react";
import { withCondition } from "../HOC";
import BasicComponents from "../BasicComponents";
import { filters_constants } from "../../types";
import { withHandlers } from "recompose";

const TodoMessage = withHandlers({
  handleClick: ({ errorMessage, cancelErrorTodo, setFilter }) => e => {
    e.preventDefault();
    if (errorMessage !== "") {
      cancelErrorTodo();
      setFilter(filters_constants.ALL);
    }
    return;
  }
})(({ errorMessage, handleClick }) => (
  <BasicComponents.Message alert="danger" message={errorMessage} tag="h4">
    <a className="float-right" href="" onClick={handleClick}>
      X
    </a>
  </BasicComponents.Message>
));

export default withCondition(TodoMessage);
