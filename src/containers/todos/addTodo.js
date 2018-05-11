import { connect } from "react-redux";

import {
  cancellCommentRequest,
  cancelErrorTodo,
  addTodo,
  setErrorTodo,
  setFilter
} from "../../actions/todoActions";

import AddTodo from "../../components/todoComponents/AddTodo";

function mapStateToProps(initState) {
  let state = initState.todoState;
  return {
    errorMessage: state.error,
    commentStatus: state.commentManagement.status,
    filter: state.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancellCommentRequest: () => dispatch(cancellCommentRequest()),
    cancelErrorTodo: () => dispatch(cancelErrorTodo()),
    addTodo: (todo, fromWhere) => dispatch(addTodo(todo, fromWhere)),
    setErrorTodo: (error = "") => dispatch(setErrorTodo(error)),
    setFilter: filter => dispatch(setFilter(filter))
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { commentStatus, filter } = stateProps;
  const dispatch = dispatchProps;
  return {
    filter,
    commentStatus,
    errorMessage: stateProps.errorMessage ? stateProps.errorMessage : "",
    cancellCommentRequest: () => dispatch.cancellCommentRequest(),
    cancelErrorTodo: () => dispatch.cancelErrorTodo(),
    setFilter: filter => dispatch.setFilter(filter),
    addTodo: (todo, fromWhere) => {
      let error;
      if (todo === "") {
        error = "Please add todo and then submit";
        return dispatch.setErrorTodo(error);
      } else {
        return dispatch.addTodo(todo, fromWhere);
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  areStatesEqual: (next, prev) => prev === next
})(AddTodo);
