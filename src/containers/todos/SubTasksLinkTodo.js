import React from "react";
import { connect } from "react-redux";
import { withHandlers, compose } from "recompose";
import {
  openTodoBoard,
  cancellCommentRequest
} from "../../actions/todoActions";

const enhance = compose(
  connect(
    state => ({
      comment: state.todoState.commentManagement
    }),
    {
      openTodoBoard,
      cancellCommentRequest
    }
  ),
  withHandlers({
    click: ({ comment, openTodoBoard, cancellCommentRequest, todo }) => () => {
      const id = todo.id;
      if (comment.status !== "" && comment.id === id) cancellCommentRequest();
      openTodoBoard(id);
    }
  })
);

const SubTasksLinkTodo = enhance(({ click }) => (
  <button type="button" className="btn btn-link float-right" onClick={click}>
    Subs
  </button>
));

export default SubTasksLinkTodo;
