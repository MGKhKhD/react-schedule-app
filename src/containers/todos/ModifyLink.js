import React from "react";
import { connect } from "react-redux";
import { todoModifyRequest, todoModifyCancel } from "../../actions/todoActions";
import { withCondition } from "../../components/HOC";
import { withHandlers, compose } from "recompose";

const enhance = compose(
  connect(state => ({ modify: state.todoState.modify }), {
    todoModifyCancel,
    todoModifyRequest
  }),
  withHandlers({
    click: ({ id, modify, todoModifyCancel, todoModifyRequest }) => () => {
      if (modify.status === "requested" && modify.id !== id) {
        todoModifyCancel(modify.id);
        todoModifyRequest(id);
      } else if (modify.status === "requested" && modify.id === id) {
        todoModifyCancel(id);
      } else if (modify.status === "canceled" || modify.status === "") {
        todoModifyRequest(id);
      }
    }
  })
);

const ModifyLink = enhance(({ click }) => (
  <button type="button" className="btn btn-link float-right" onClick={click}>
    modify
  </button>
));

export default withCondition(ModifyLink);
