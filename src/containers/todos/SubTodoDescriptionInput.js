import React from "react";
import { connect } from "react-redux";
import { updateSubTask } from "../../actions/todoActions";
import { compose, withHandlers } from "recompose";

import { InlineInput } from "../../components/BasicComponents";

const enhance = compose(
  connect(null, { updateSubTask }),
  withHandlers({
    handleCallBack: ({
      subTask,
      updateSubTask,
      closeDescriptionClick
    }) => text => {
      if (text !== "") {
        updateSubTask({
          ...subTask,
          description: text
        });
        closeDescriptionClick();
      }
    }
  })
);

const SubTodoDescriptionInput = enhance(props => (
  <InlineInput inputText={props.description} cbFn={props.handleCallBack} />
));

export default SubTodoDescriptionInput;
