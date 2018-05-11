import React, { Component } from "react";

class CommentListTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: -1,
      mouse: "leave"
    };
  }

  liMouseOver = id => {
    this.setState({ commentId: id, mouse: "over" });
  };

  liMouseLeave = id => {
    this.setState({ commentId: id, mouse: "leave" });
  };

  render() {
    const { comment } = this.props;

    return (
      <li
        className="list-group-item"
        onMouseOver={() => this.liMouseOver(comment.id)}
        onMouseLeave={() => this.liMouseLeave(comment.id)}
      >
        {this.props.children(this.state)}
      </li>
    );
  }
}

export default CommentListTag;
