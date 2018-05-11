import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { archiveTodo, reactivateTodo } from "../../actions/todoActions";

const enhance = compose(
  connect(null, {
    archiveTodo,
    reactivateTodo
  }),
  withHandlers({
    handleClick: props => () => {
      if (!props.todo.archiveId) {
        props.archiveTodo(props.todo.id);
      } else if (!!props.todo.archiveId) {
        props.reactivateTodo(props.todo);
      }
    }
  })
);

const ArchiveLinkTodo = enhance(({ todo, handleClick }) => (
  <button
    type="button"
    className="btn btn-link float-right"
    onClick={handleClick}
  >
    {!todo.archiveId ? "archive" : "reactivate"}
  </button>
));

export default ArchiveLinkTodo;
