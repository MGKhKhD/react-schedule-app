import React from "react";
import { withCondition } from "../HOC";

import SubTodoAddButton from "../../containers/todos/SubTodoAddButton";
import SubTodoList from "../../containers/todos/SubTodoList";

const SubTodoSegment = ({ todoBoard }) => (
  <div className="row">
    <SubTodoAddButton todoBoard={todoBoard} />
    <SubTodoList todoBoard={todoBoard} />
  </div>
);

export default withCondition(SubTodoSegment);
