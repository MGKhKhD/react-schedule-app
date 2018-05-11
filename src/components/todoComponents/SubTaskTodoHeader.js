import React from "react";
import { withCondition } from "../HOC";
import SubTaskDate from "./SubTaskDate";
import SubTaskDelete from "./SubTaskDelete";
import SubTaskDateUpdate from "../../containers/todos/SubTaskDateUpdate";
import { pickKeys } from "../../utils";

const Composed = props => {
  console.log(props.dateUpdate);
  return (
    <div className="card-header">
      {props.dateUpdate ? (
        <SubTaskDateUpdate {...props} />
      ) : (
        <SubTaskDate {...pickKeys(props, ["dueDate", "headerClick"])} />
      )}
      <SubTaskDelete {...pickKeys(props, ["deleteClick"])} />
    </div>
  );
};
const SubTaskTodoHeader = withCondition(Composed);

export default SubTaskTodoHeader;
