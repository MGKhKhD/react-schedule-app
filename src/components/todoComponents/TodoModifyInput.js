import React from "react";
import { InlineInput } from "../BasicComponents";
import { withHandlers, mapProps, compose } from "recompose";
import { pickKeys } from "../../utils";

const TodoModifyInput = compose(
  mapProps(props =>
    pickKeys(props, ["todo", "todoModifyCancel", "todoModifySuccess"])
  ),
  withHandlers({
    handleCallBack: ({ todo, todoModifyCancel, todoModifySuccess }) => text => {
      todoModifySuccess(todo.id, text);
      todoModifyCancel(todo.id);
    }
  })
)(props => (
  <InlineInput inputText={props.todo.todo} cbFn={props.handleCallBack} />
));

export default TodoModifyInput;
