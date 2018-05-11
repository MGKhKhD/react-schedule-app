import React, { Component } from "react";

class TodoClick extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, position: {} };

    this.width = 256;
    this.space = 16;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.clicked &&
      !this.checkBlockingStatus({ ...nextProps, idx: this.props.todo.id })
    ) {
      this.setState({ ...this.state, clicked: false });
    }
  }

  handleClick = todo => {
    const { todoClick } = this.props;
    const idx = todo.id;
    //if todo is completed go ahead and active
    if (todo.completed) {
      todoClick(idx);
      return;
    }

    //check if todo is blocked by an active todo
    const result = this.checkBlockingStatus({ ...this.props, idx });
    if (!result) {
      // todo is not blocked
      todoClick(idx);
      return;
    }
    this.setState({ clicked: true, position: this.setPosition() });
    return;
  };

  checkBlockingStatus = ({ todos, blockingInfo, idx }) => {
    let result = false;
    for (let key in blockingInfo) {
      if (
        key &&
        parseInt(key, 10) !== idx &&
        blockingInfo[key].indexOf(idx) > -1
      ) {
        if (
          todos.filter(
            ({ completed, id }) => id === parseInt(key, 10) && !completed
          ).length > 0
        ) {
          result = true;
        }
      }
    }
    return result;
  };

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
    const { todo } = this.props;
    return (
      <span
        className="btn btn-link"
        onClick={() => this.handleClick(todo)}
        style={{ fontSize: "20px" }}
        ref={elm => (this.el = elm)}
      >
        {this.props.children(this.state)}
      </span>
    );
  }
}

export default TodoClick;
