import React, { Component } from "react";
import BasicComponents from "../BasicComponents";

class CommentToggleTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1
    };
  }

  liClick(id) {
    const { clickedComment } = this.state;
    if (clickedComment !== id) {
      this.setState({ clickedComment: id });
      this.props.setClickedComment(id);
    } else if (clickedComment === id) {
      this.setState({ clickedComment: -1 });
      this.props.setClickedComment(-1);
    }
  }

  setSpanText = ({ restricted, mouseInfo, id }) => {
    let spanText = "";
    if (restricted) {
      if (mouseInfo.mouse === "over" && mouseInfo.commentId === id) {
        if (this.state.clickedComment === id) {
          spanText = ">>>>";
        } else {
          spanText = "<<<<";
        }
      } else if (mouseInfo.mouse === "leave") {
        if (this.state.clickedComment === id) {
          spanText = "<<<<";
        } else if (this.state.clickedComment !== id) {
          spanText = "";
        }
      }
    }
    return spanText;
  };

  render() {
    const { id, mouseInfo, restricted } = this.props;

    const spanText = this.setSpanText({
      mouseInfo,
      restricted,
      id
    });
    return (
      <BasicComponents.Span onClick={() => this.liClick(id)}>
        {spanText}
      </BasicComponents.Span>
    );
  }
}

export default CommentToggleTag;
