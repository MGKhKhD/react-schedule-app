import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addComment,
  modifyComment,
  cancelModifyComment
} from "../../actions/todoActions";

import { withCondition } from "../../components/HOC";

import BasicComponents from "../../components/BasicComponents";
import CommentModal from "../../components/todoComponents/CommentModal";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
    this.textArea = null;
    this.setTextAreaRef = element => {
      this.textArea = element;
    };
    this.focusTextArea = () => {
      if (this.textArea) this.textArea.focus();
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentManagement.status === "needModify") {
      this.focusTextArea();
      const oldComment = this.props.comments.filter(
        comment => comment.id === nextProps.commentManagement.commentId
      );
      this.setState({
        comment: oldComment[0].comment
      });
    }
  }

  componentDidMount() {
    this.focusTextArea();
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.commentManagement.status === "needModify") {
      this.props.modifyingComment(this.state.comment);
      this.props.modifyComment(
        this.state.comment.trim(),
        this.props.commentManagement.id,
        this.props.commentManagement.commentId
      );
      this.props.cancelModifyComment();
    } else {
      this.props.addComment(
        this.state.comment.trim(),
        this.props.commentManagement.id
      );
    }
    this.setState({ comment: "" });
    e.target.value = "";
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
    if (this.props.commentManagement.status === "needModify") {
      this.props.modifyingComment(this.state.comment);
    }
  };

  render() {
    const inputValue =
      this.props.commentManagement.status === "needModify" ? "Modify" : "Add";

    return (
      <div>
        <BasicComponents.FormWithTextArea
          onSubmit={this.handleSubmit}
          textRef={this.setTextAreaRef}
          placeholder="add comment..."
          name="comment"
          onChange={this.handleChange}
          textValue={this.state.comment}
          inputValue={inputValue}
        >
          <CommentModal
            comments={this.props.comments}
            condition={this.props.comments.length > 2}
          />
        </BasicComponents.FormWithTextArea>
      </div>
    );
  }
}

export default withCondition(
  connect(null, {
    addComment,
    modifyComment,
    cancelModifyComment
  })(CommentForm)
);
