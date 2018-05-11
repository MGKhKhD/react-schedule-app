import React, { Component } from "react";
import { connect } from "react-redux";

import { getTotalCommentsForTodo } from "../../selectors/todoSelectors";
import { withCondition } from "../../components/HOC";

import CommentList from "../../components/todoComponents/CommentList";
import CommentForm from "./CommentForm";

class CommentSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentManagement.status === "needModify") {
      const oldComment = this.props.comments.filter(
        comment => comment.id === nextProps.commentManagement.commentId
      );
      this.setState({
        comment: oldComment[0].comment
      });
    }
  }

  modifyingComment = comment => {
    this.setState({ comment });
  };

  render() {
    return (
      <div>
        <CommentForm
          condition={this.props.restricted}
          comments={this.props.comments}
          commentManagement={this.props.commentManagement}
          modifyingComment={this.modifyingComment}
        />
        <CommentList
          condition={!!this.props.comments}
          comments={this.props.comments}
          restricted={this.props.restricted}
          changingComment={this.state.comment}
          commentManagement={this.props.commentManagement}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: getTotalCommentsForTodo(state.todoState),
    commentManagement: state.todoState.commentManagement
  };
}

export default withCondition(connect(mapStateToProps)(CommentSegment));
