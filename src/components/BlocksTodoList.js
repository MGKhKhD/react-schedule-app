import React from "react";
import BlockedBy from "../containers/BlockedBy";
import Blocks from "../containers/Blocks";
import { withCondition } from "./HOC";

const BlocksTodoList = ({ blockStat, todo, todos }) => {
  const id = todo.id;
  if (
    blockStat.filter(({ todoId, blocks }) => todoId === id && blocks).length > 0
  ) {
    return <Blocks id={id} todos={todos} />;
  } else if (
    blockStat.filter(({ todoId, blockedBy }) => todoId === id && blockedBy)
      .length > 0
  ) {
    return <BlockedBy id={id} todos={todos} />;
  } else {
    return null;
  }
};

export default withCondition(BlocksTodoList);
