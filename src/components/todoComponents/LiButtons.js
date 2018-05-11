import React from "react";

import ArchiveLinkTodo from "../../containers/todos/ArchiveLinkTodo";
import SubTasksLinkTodo from "../../containers/todos/SubTasksLinkTodo";
import DeleteTodoButton from "../../containers/todos/DeleteTodoButton";
import TodoBlockingButtons from "../../containers/todos/TodoBlockingButtons";
import ModifyLink from "../../containers/todos/ModifyLink";

const LiButtons = ({
  todo,
  comment,
  conditionModify,
  conditionBlocks,
  updateBlockingStateParent
}) => (
  <React.Fragment>
    <span className="float-right">{">>"}</span>
    <ModifyLink id={todo.id} condition={conditionModify} />
    <TodoBlockingButtons
      id={todo.id}
      updateBlockingStateParent={state => updateBlockingStateParent(state)}
      condition={conditionBlocks}
    />
    <DeleteTodoButton todo={todo} />
    <ArchiveLinkTodo todo={todo} />
    <SubTasksLinkTodo todo={todo} />
  </React.Fragment>
);

export default LiButtons;
