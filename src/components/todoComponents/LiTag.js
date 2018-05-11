import React from "react";

import TodoLiTag from "../../containers/todos/TodoLiTag";
import CommentSegment from "../../containers/todos/CommentSegment";
import BlocksTodoList from "../BlocksTodoList";
import SubTodoSegment from "./SubTodoSegment";

const LiTag = ({
  todo,
  modify,
  todos,
  id,
  restricted,
  conditionComment,
  conditionBlocks,
  blockStat,
  conditionSubTodo,
  todoBoard
}) => {
  return (
    <React.Fragment>
      <TodoLiTag todo={todo} modify={modify} todos={todos} />
      <BlocksTodoList
        condition={conditionBlocks}
        blockStat={blockStat}
        todo={todo}
        todos={todos}
      />
      <CommentSegment
        id={id}
        restricted={!todo.archiveId}
        condition={conditionComment}
      />
      <SubTodoSegment condition={conditionSubTodo} todoBoard={todoBoard} />
    </React.Fragment>
  );
};

export default LiTag;
