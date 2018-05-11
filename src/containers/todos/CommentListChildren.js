import React, { Component } from "react";
import { connect } from "react-redux";

import { moveComment } from "../../actions/todoActions";
import { getTodos } from "../../selectors/todoSelectors";
import { withCondition } from "../../components/HOC";

import FooterCommentContainer from "./FooterCommentContainer";
import BasicComponents from "../../components/BasicComponents";
import FilteredCommentDropdown from "../../components/todoComponents/FilteredCommentDropdown";
import CommentToggleTag from "../../components/todoComponents/CommentToggleTag";

const ConditionalFragment = withCondition(React.Fragment);

class CommentListChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1,
      underModification: -1,
      movingComment: { from: -1, to: -1, status: false }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.commentManagement.status === "requested" &&
      this.props.commentManagement.status === "needModify"
    ) {
      this.setState({ underModification: -1 });
    }
  }

  setOptions = (todos, commentManagement) => {
    return todos.filter(({ id }) => id !== commentManagement.id);
  };

  dropDownClick = (option, destinations) => {
    const options = destinations.map(dest =>
      dest.todo.substring(0, 20).concat("...")
    );
    const idx = options.indexOf(option);
    this.props.moveComment(this.state.movingComment.from, destinations[idx].id);
  };

  handleSetCommentState = obj => {
    this.setState({
      ...this.state,
      movingComment: {
        ...this.state.movingComment,
        status: obj.status,
        from: obj.from
      }
    });
  };

  handleSetUnderModification = index => {
    this.setState({ underModification: index });
  };

  setCondition = ({ restricted, mouseInfo, id }) => {
    return (
      this.state.clickedComment === id &&
      restricted &&
      mouseInfo.commentId === id &&
      mouseInfo.mouse === "over"
    );
  };

  render() {
    const {
      todos,
      comment,
      commentManagement,
      changingComment,
      mouseInfo,
      restricted
    } = this.props;

    const destinations = this.setOptions(todos, commentManagement);
    const conditionComment = this.setCondition({
      mouseInfo,
      restricted,
      id: comment.id
    });

    return (
      <React.Fragment>
        <BasicComponents.Span
          style={{
            color:
              this.state.underModification === comment.id ? "blue" : "black"
          }}
        >
          {this.state.underModification === comment.id
            ? changingComment
            : comment.comment}
        </BasicComponents.Span>
        <div className="row">
          <CommentToggleTag
            mouseInfo={mouseInfo}
            restricted={restricted}
            id={comment.id}
            setClickedComment={id => {
              this.setState({ clickedComment: id });
            }}
          />
          <ConditionalFragment condition={conditionComment}>
            <br />
            <FooterCommentContainer
              id={comment.id}
              setCommentState={this.handleSetCommentState}
              movingComment={this.state.movingComment}
              setUnderModification={this.handleSetUnderModification}
            />
            <FilteredCommentDropdown
              condition={this.state.movingComment.status}
              filteredCondition={commentManagement.id}
              items={todos}
              name="destination"
              onClick={option => this.dropDownClick(option, destinations)}
              mainButtonClassName="btn-secondary"
            />
          </ConditionalFragment>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: getTodos(state)
  };
}

export default connect(mapStateToProps, { moveComment })(CommentListChildren);
