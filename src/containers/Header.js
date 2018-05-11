import React from "react";
import { connect } from "react-redux";
import { getTotalTodos } from "../selectors/todoSelectors";

import TodoHeader from "../components/TodoHeader";

const Header = ({ todosCount, todoBoard, filter }) => (
  <TodoHeader todoCount={todosCount} filter={filter} />
);

export default connect(state => ({
  todosCount: getTotalTodos(state.todoState),
  filter: state.todoState.filter
}))(Header);
