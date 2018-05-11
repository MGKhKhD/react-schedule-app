import React, { Component } from "react";
import BasicComponents from "../BasicComponents";

class SubTaskDueDateInitSetup extends Component {
  constructor(props) {
    super(props);
    this.state = { position: {} };

    this.width = 256;
    this.space = 16;
  }

  componentDidMount() {
    this.setState({ position: this.setPosition() });
  }

  setPosition = () => {
    const style = { width: this.width };
    const dimensions = this.el.getBoundingClientRect();
    style.left = dimensions.left + dimensions.width / 2 - this.width / 2;
    style.left = Math.max(this.space, style.left);
    style.left = Math.min(
      style.left,
      document.body.clientWidth - this.width - this.space
    );

    if (dimensions.top < window.innerHeight / 2) {
      style.top = dimensions.top + dimensions.height + this.space;
    } else {
      style.bottom = window.innerHeight - dimensions.top + this.space;
    }
    return style;
  };

  render() {
    return (
      <span ref={elm => (this.el = elm)}>
        {this.props.children(this.state)}
      </span>
    );
  }
}

export default SubTaskDueDateInitSetup;
