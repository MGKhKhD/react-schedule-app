import React from "react";
import { connect } from "react-redux";
import { mapProps, compose, withHandlers } from "recompose";
import { pickKeys } from "../../utils";

import { addSubTask } from "../../actions/todoActions";
import { InlineInput } from "../../components/BasicComponents";

const enhance = compose(
  mapProps(props => pickKeys(props, ["title", "todoBoard", "closeTitleClick"])),
  connect(null, { addSubTask }),
  withHandlers({
    handleCallBack: ({
      title,
      addSubTask,
      closeTitleClick,
      todoBoard
    }) => text => {
      if (title === "+ add new sub task" && text !== "") {
        addSubTask({
          text,
          parentId: todoBoard.todoId
        });
        closeTitleClick();
      }
    }
  })
);

const SubTodoTitleInput = enhance(props => (
  <InlineInput inputText={props.title} cbFn={props.handleCallBack} />
));

export default SubTodoTitleInput;
