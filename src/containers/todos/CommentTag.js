import React from "react";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import {
  commentRequest,
  cancellCommentRequest
} from "../../actions/todoActions";

import BasicComponents from "../../components/BasicComponents";

const enhance = compose(
  connect(
    state => ({
      commentManagement: state.todoState.commentManagement
    }),
    {
      commentRequest,
      cancellCommentRequest
    }
  ),
  withHandlers({
    handleClick: props => () => {
      if (props.comment.status === "requested") {
        if (props.commentManagement.id === props.id) {
          props.cancellCommentRequest();
        } else {
          props.commentRequest(props.id);
        }
      } else {
        props.commentRequest(props.id);
      }
    }
  })
);

const CommentTag = enhance(
  ({ comment, commentManagement, handleClick, id }) => (
    <BasicComponents.Span className="float-left" onClick={handleClick}>
      {comment.status === "requested" && commentManagement.id === id
        ? "V"
        : "^"}
    </BasicComponents.Span>
  )
);

export default CommentTag;
