import React from "react";
import { connect } from "react-redux";
import { withHandlers, compose } from "recompose";
import { deleteTodo } from "../../actions/todoActions";

const enhance = compose(
  connect(null, { deleteTodo }),
  withHandlers({
    deleteTodo: props => () =>
      props.deleteTodo(props.todo.id, "todosPage", props.todo.archiveId)
  })
);

const DeleteTodoButton = enhance(({ deleteTodo }) => (
  <button
    type="button"
    className="btn btn-link float-right"
    onClick={deleteTodo}
  >
    delete
  </button>
));

export default DeleteTodoButton;
