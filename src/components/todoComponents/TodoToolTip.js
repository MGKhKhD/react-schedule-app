import React, { Component } from "react";
import { BasicPortal } from "../BasicComponents";
import TodoClick from "./TodoClick";

const toolTipStyle = {
  position: "fixed",
  padding: "8px",
  background: "#333",
  color: "white",
  textAlign: "center",
  fontSize: "16px"
};

class TodoToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = { showingTooltip: true };
  }

  componentDidMount() {
    this.timeOut = setTimeout(
      () => this.setState({ showingTooltip: false }),
      5000
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  render() {
    const { todos, blockingInfo, todo, todoClick } = this.props;
    return (
      <TodoClick
        todos={todos}
        blockingInfo={blockingInfo}
        todo={todo}
        todoClick={todoClick}
      >
        {({ clicked, position }) => {
          const style = { ...toolTipStyle, ...position };
          return (
            <React.Fragment>
              <strong style={{ color: todo.completed ? "green" : "red" }}>
                {todo.todo.length > 20
                  ? todo.todo.substring(0, 20).concat("...")
                  : todo.todo}
              </strong>
              {clicked &&
                this.state.showingTooltip && (
                  <BasicPortal>
                    <div style={style}>
                      {`This task is blocked, not possible to complete without cmpleting blocking todos first.`}
                    </div>
                  </BasicPortal>
                )}
            </React.Fragment>
          );
        }}
      </TodoClick>
    );
  }
}

export default TodoToolTip;
