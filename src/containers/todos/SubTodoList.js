import React from "react";
import { connect } from "react-redux";
import { getSubTasksOfTodo } from "../../selectors/todoSelectors";

import BasicComponents from "../../components/BasicComponents";
import SubTodoElement from "./SubTodoElement";

const SubTodoList = ({ todoBoard, subTasks }) => (
  <BasicComponents.Repeat numItems={subTasks.length}>
    {idx => <SubTodoElement subTask={subTasks[idx]} key={idx} />}
  </BasicComponents.Repeat>
);

function mapStateToProps(state, ownProps) {
  const subTasks = getSubTasksOfTodo(
    state.todoState,
    ownProps.todoBoard.todoId
  );
  return {
    subTasks
  };
}

export default connect(mapStateToProps)(SubTodoList);
