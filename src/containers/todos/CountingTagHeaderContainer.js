import React from "react";
import { connect } from "react-redux";
import { withProps, compose } from "recompose";
import { filters_constants } from "../../types";

import { getTotalTodosByFilter } from "../../selectors/todoSelectors";

import CountingTagHeader from "../../components/todoComponents/CountingTagHeader";

const setColor = ({ filter, todos, colors }) => {
  let color = colors[filter];
  if (filter === filters_constants.TOGGLE_ALL) {
    let superStatus = todos.every(todo => todo.completed);
    color = superStatus
      ? colors[filters_constants.COMPLETED]
      : colors[filters_constants.ACTIVE];
  }
  return color;
};

const mapStateToProps = state => ({
  totalTodos: getTotalTodosByFilter(state.todoState),
  todos: state.todoState.todos.todos,
  filter: state.todoState.filter
});

const enhance = compose(
  connect(mapStateToProps),
  withProps(props => ({
    ...props,
    color: setColor(props)
  }))
);

const CountingTagHeaderContainer = enhance(({ filter, color, totalTodos }) => (
  <CountingTagHeader
    color={color}
    totalTodos={totalTodos}
    activeFilter={filter}
  />
));

export default CountingTagHeaderContainer;
