import React from "react";
import { connect } from "react-redux";
import BasicComponents from "../components/BasicComponents";
import { shallowCompareStateAndPropsForUpdate } from "../utils";
import { getBlockingTodos } from "../selectors/todoSelectors";

class BlockedBy extends React.Component {
  shouldComponentUpdate(nextProps) {
    return shallowCompareStateAndPropsForUpdate.call(this, nextProps);
  }

  render() {
    const { blokingTodos } = this.props;

    const rows = [];
    blokingTodos.forEach(todo => {
      rows.push(
        <li key={todo.id} className="list-group-item">
          <span style={{ color: todo.completed ? "green" : "red" }}>
            {todo.todo}
          </span>
        </li>
      );
    });

    return (
      <React.Fragment>
        {blokingTodos.length > 0 ? (
          <React.Fragment>
            <p>This task is blocked by</p>
            <ul className="list-group mt-1 mb-1">{rows}</ul>
          </React.Fragment>
        ) : (
          <BasicComponents.Message
            alert="success"
            tag="h5"
            message="No todos is blocking this task."
          />
        )}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    blokingTodos: getBlockingTodos(state.todoState, ownProps.id, ownProps.todos)
  };
}

export default connect(mapStateToProps, null)(BlockedBy);
