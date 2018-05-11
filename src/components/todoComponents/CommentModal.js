import React, { Component } from "react";
import CommentModalButton from "./CommentModalButton";
import BasicComponents, { BasicModal } from "../BasicComponents";
import { shallowCompareStateAndPropsForUpdate } from "../../utils";

import { withCondition } from "../HOC";

class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompareStateAndPropsForUpdate.call(
      this,
      nextProps,
      nextState
    );
  }

  handleClick = e => {
    this.setState({ showModal: false });
  };

  render() {
    const { comments } = this.props;
    return (
      <CommentModalButton>
        {clicked => (
          <React.Fragment>
            comments
            {clicked &&
              this.state.showModal && (
                <BasicModal>
                  <BasicComponents.List numItems={comments.length}>
                    {idx => {
                      const comment = comments[idx];
                      return (
                        <BasicComponents.Span key={idx}>
                          {comment.comment}
                        </BasicComponents.Span>
                      );
                    }}
                  </BasicComponents.List>
                  <hr />
                  <button
                    className="btn btn-primary float-right"
                    onClick={this.handleClick}
                  >
                    Close
                  </button>
                </BasicModal>
              )}
          </React.Fragment>
        )}
      </CommentModalButton>
    );
  }
}

export default withCondition(CommentModal);
