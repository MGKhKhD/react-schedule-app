import React from "react";
import LiControlButton from "./LiControlButton";
import LiButtons from "./LiButtons";

const TodoControlTag = ({
  todo,
  comment,
  conditionModify,
  updateBlockingStateParent,
  conditionBlocks
}) => {
  return (
    <LiControlButton
      render={clicked => {
        if (clicked) {
          return (
            <LiButtons
              todo={todo}
              comment={comment}
              conditionModify={conditionModify}
              updateBlockingStateParent={updateBlockingStateParent}
              conditionBlocks={conditionBlocks}
            />
          );
        } else {
          return <React.Fragment>{"..."}</React.Fragment>;
        }
      }}
    />
  );
};

export default TodoControlTag;
