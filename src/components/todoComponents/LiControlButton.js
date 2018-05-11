import React, { Component } from "react";

class LiControlButton extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    return (
      <span
        onClick={() => this.setState({ clicked: !this.state.clicked })}
        className="float-right"
      >
        {this.props.render(this.state.clicked)}
      </span>
    );
  }
}

export default LiControlButton;
