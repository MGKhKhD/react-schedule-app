import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withBranch } from "../../components/HOC";

import {
  todoModifyCancel,
  todoModifySuccess,
  todoClick
} from "../../actions/todoActions";

import TodoModifyInput from "../../components/todoComponents/TodoModifyInput";
import TodoToolTip from "../../components/todoComponents/TodoToolTip";

const TodoLiTag = ({ todo, modify, todos, blockingInfo, dispatch }) => {
  const boundedActions = bindActionCreators(
    {
      todoModifyCancel,
      todoModifySuccess,
      todoClick
    },
    dispatch
  );

  const Branch = withBranch(TodoModifyInput, TodoToolTip);

  return (
    <Branch
      test={modify.status === "requested" && modify.id === todo.id}
      todos={todos}
      blockingInfo={blockingInfo}
      todo={todo}
      {...boundedActions}
    />
  );
};

export default connect(state => ({
  blockingInfo: state.todoState.blockingInfo
}))(TodoLiTag);
