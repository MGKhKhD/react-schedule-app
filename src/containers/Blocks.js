import React, { Component } from "react";
import { connect } from "react-redux";
import { shallowCompareStateAndPropsForUpdate } from "../utils";

import {
  todoBlocksIt,
  deleteTodoFromBlockedByListOfTodo
} from "../actions/todoActions";

import BasicComponents from "../components/BasicComponents";

class Blocks extends Component {
  shouldComponentUpdate(nextProps) {
    return shallowCompareStateAndPropsForUpdate.call(this, nextProps);
  }

  checkIfBlockedBy = (currentId, todoId) => {
    const { blockingInfo } = this.props;
    let result = false;
    if (blockingInfo[todoId] && blockingInfo[todoId].indexOf(currentId) > -1) {
      result = true;
    }
    return result;
  };

  checkIfBlockeing = (currentId, todoId) => {
    const { blockingInfo } = this.props;
    let result = false;
    if (
      blockingInfo[currentId] &&
      blockingInfo[currentId].indexOf(todoId) > -1
    ) {
      result = true;
    }
    return result;
  };

  render() {
    const {
      id,
      todos,
      todoBlocksIt,
      deleteTodoFromBlockedByListOfTodo
    } = this.props;

    const availableTodos = [];
    const blokingTodos = [];
    todos.forEach(todo => {
      if (
        todo.id !== id &&
        !this.checkIfBlockedBy(id, todo.id) &&
        !this.checkIfBlockeing(id, todo.id)
      ) {
        availableTodos.push(
          <li key={todo.id} className="list-group-item">
            <span style={{ color: todo.completed ? "green" : "red" }}>
              {todo.todo}
            </span>
            <span
              className="float-right"
              onClick={() => todoBlocksIt(id, todo.id)}
            >
              <strong>+</strong>
            </span>
          </li>
        );
      }

      if (todo.id !== id && this.checkIfBlockeing(id, todo.id)) {
        blokingTodos.push(
          <li key={todo.id} className="list-group-item">
            <span style={{ color: todo.completed ? "green" : "red" }}>
              {todo.todo}
            </span>
            <span
              className="float-right"
              onClick={() => deleteTodoFromBlockedByListOfTodo(id, todo.id)}
            >
              <strong>X</strong>
            </span>
          </li>
        );
      }
    });
    return (
      <React.Fragment>
        <p>Blocking Todos...</p>
        {blokingTodos.length > 0 ? (
          <ul className="list-group mt-1 mb-1">{blokingTodos}</ul>
        ) : (
          <BasicComponents.Message
            alert="danger"
            tag="h4"
            message="No todos is blocked."
          />
        )}
        <br />
        <p>Possible Todos to Block...</p>
        {availableTodos.length > 0 ? (
          <ul className="list-group mt-1 mb-1">{availableTodos}</ul>
        ) : (
          <BasicComponents.Message
            alert="danger"
            tag="h4"
            message="No todos to block."
          />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    blockingInfo: state.todoState.blockingInfo
  };
}

export default connect(mapStateToProps, {
  todoBlocksIt,
  deleteTodoFromBlockedByListOfTodo
})(Blocks);
