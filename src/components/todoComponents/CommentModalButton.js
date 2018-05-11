import React, { Component } from "react";

class CommentModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ showModal: !this.state.showModal });
  };
  render() {
    return (
      <button
        className="btn btn-dark btn-sm float-right"
        onClick={this.handleClick}
      >
        {this.props.children(this.state.showModal)}
      </button>
    );
  }
}

export default CommentModalButton;
