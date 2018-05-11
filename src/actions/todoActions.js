import {
  ADD_TODO,
  SET_FILTER,
  TODO_CLICK,
  TODO_DELETE,
  ARCHIVE_TODO_DELETE,
  ARCHIVE_TODO,
  TODO_MODIFY_REQUEST,
  TODO_MODIFY_CANCEL,
  TODO_MODIFY_SUCCESS,
  COMMENT_REQUEST,
  ADD_COMMENT,
  DELETE_COMMENTS,
  COMMENT_REQUEST_CANCELLED,
  SET_TODO_ERROR,
  CANCEL_TODO_ERROR,
  SET_COMMENT_MODIFY,
  DELETE_A_COMMENT,
  MODIFY_COMMENT,
  CANCEL_MODIFY_COMMENT,
  ARCHIVE_COMMENTS_OF_TODO,
  filters_constants,
  TOGGLE_ALL_TODOS,
  DELETE_ALL_COMPLETED_TODOS,
  DELETE_ARCHIVE_COMMENTS_OF_TODO,
  OPENED_TODO_BOARD,
  MOVE_COMMENT,
  ADD_TO_BLOCK_LIST_OF_TODO,
  DELETE_TODO_FROM_BLOCKING_ENTRY,
  DELETE_TODO_FROM_BLOCKEDBY_LIST_OF_TODO,
  CLOSE_TODO_BOARD,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  DELETE_A_SUBTASK,
  ARCHIVE_SUBTASKS,
  DELETE_ARCHIVE_SUBTASKS_OF_TODO
} from "../types";

import {
  getAllTodosByFilter,
  getSubTasksOfTodo
} from "../selectors/todoSelectors";

let commentIndex = 4; //based on mockdata
let todoId = 2; //based on mock data

export function makeAddTodo(text, fromWhere, ...args) {
  let completed;
  if (args.length > 0) completed = args[0];
  return {
    type: ADD_TODO,
    text,
    id: todoId++,
    completed: completed || false,
    fromWhere
  };
}

export function setErrorTodo(error) {
  return {
    type: SET_TODO_ERROR,
    error
  };
}

export const addTodo = (text, fromWhere) => (dispatch, getState) => {
  let initState = getState().todoState;

  if (initState.commentManagement.status !== "") {
    dispatch(cancellCommentRequest());
  }

  if (initState.modify.status === "requested") {
    const id = initState.modify.id;
    dispatch(todoModifyCancel(id));
  }

  let allActiveTodos = getAllTodosByFilter(
    initState,
    filters_constants.ACTIVE
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());
  let allCompletedTodos = getAllTodosByFilter(
    initState,
    filters_constants.COMPLETED
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());
  let allArchivedTodos = getAllTodosByFilter(
    initState,
    filters_constants.ARCHIVES
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());

  let result = "";

  if (allActiveTodos && allActiveTodos.length > 0) {
    result = "active";
  } else if (allCompletedTodos && allCompletedTodos.length > 0) {
    result = "completed";
  } else if (allArchivedTodos && allArchivedTodos.length > 0) {
    result = "archived";
  }

  let error;
  if (result === "active") {
    error = `${text} is already in active list!`;
    dispatch(setErrorTodo(error));
  } else if (result === "completed") {
    error = `${text} is already in completed list`;
    dispatch(setErrorTodo(error));
  } else if (result === "archived") {
    error = `${text} is archived. Reactivate todo instead.`;
    dispatch(setErrorTodo(error));
  } else {
    dispatch(makeAddTodo(text, fromWhere));
  }
};

export function cancelErrorTodo() {
  return {
    type: CANCEL_TODO_ERROR
  };
}

export function makeSetFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
}

export function toggleAllTodos() {
  return {
    type: TOGGLE_ALL_TODOS
  };
}

export function deleteAllCompleted() {
  return {
    type: DELETE_ALL_COMPLETED_TODOS
  };
}

export const setFilter = filter => dispatch => {
  dispatch(makeSetFilter(filter));
  if (filter === filters_constants.TOGGLE_ALL) {
    dispatch(toggleAllTodos());
  } else if (filter === filters_constants.DELETE_COMPLETED) {
    dispatch(deleteAllCompleted());
  }
};

export function todoClick(id) {
  return {
    type: TODO_CLICK,
    id
  };
}

export function makeDeleteTodo(id) {
  return {
    type: TODO_DELETE,
    id
  };
}

export function makeDeleteArchiveTodo(archiveId) {
  return {
    type: ARCHIVE_TODO_DELETE,
    archiveId
  };
}

export function deleteTodoFromBlockingEntry(idOfBlocking) {
  return {
    type: DELETE_TODO_FROM_BLOCKING_ENTRY,
    idOfBlocking
  };
}

export function deleteTodoFromBlockedByListOfTodo(idOfBlocking, idOfBlockedBy) {
  return {
    type: DELETE_TODO_FROM_BLOCKEDBY_LIST_OF_TODO,
    idOfBlockedBy,
    idOfBlocking
  };
}

const persistWithBlockState = (dispatch, getState, id) => {
  const { blockingInfo } = getState().todoState;
  if (blockingInfo[id]) {
    dispatch(deleteTodoFromBlockingEntry(id));
  }
  for (let key in blockingInfo) {
    if (parseInt(key, 10) !== id && blockingInfo[key].indexOf(id) > -1) {
      dispatch(deleteTodoFromBlockedByListOfTodo(parseInt(key, 10), id));
    }
  }
};

const deleteAllSubTasksOfTodo = (dispatch, getState, todoId) => {
  const state = getState().todoState;
  const subTasks = getSubTasksOfTodo(state, todoId);
  if (subTaskId.length === 0) return;

  subTasks.forEach(({ id }) => {
    dispatch(deleteOneSubTask(id));
  });
};

export const deleteTodo = (id, fromWhere, archiveId) => (
  dispatch,
  getState
) => {
  if (!archiveId) {
    // delete from on-progress lists of todos
    // if todo is a bookmark article, in the case of unbookmark it will be deleted from
    // newsPagesActions
    if (getState().todoState.commentManagement.status !== "") {
      dispatch(cancellCommentRequest());
    }

    if (getState().todoState.modify.status === "requested") {
      const id = getState().todoState.modify.id;
      dispatch(todoModifyCancel(id));
    }

    const todos = getState().todoState.todos;
    if (todos !== {}) {
      if (fromWhere === "todosPage") {
        const arr = todos.todos;
        arr.forEach(todo => {
          if (todo.id === id) {
            dispatch(makeDeleteTodo(id));
            dispatch(deleteCommentsOfTodo(id));
          }
        });
      } else {
        dispatch(makeDeleteTodo(id));
        dispatch(deleteCommentsOfTodo(id));
      }
      // make sure todo is removed from blockingInfo state too
      persistWithBlockState(dispatch, getState, id);

      //deleting all subtasks of todo
      deleteAllSubTasksOfTodo(dispatch, getState, id);
    }
  } else {
    // delete from archived todos
    if (getState().todoState.commentManagement.status === "requested") {
      dispatch(cancellCommentRequest());
    }
    const todos = getState().todoState.archiveTodos;
    if (todos !== {}) {
      if (fromWhere === "todosPage") {
        const arr = todos.todos;
        arr.forEach(todo => {
          if (todo.id === id) {
            dispatch(makeDeleteArchiveTodo(archiveId));
            dispatch(deleteArchiveCommentsOfTodo(archiveId));
          }
        });
      } else {
        dispatch(makeDeleteArchiveTodo(archiveId));
        dispatch(deleteArchiveCommentsOfTodo(archiveId));
      }
    }
  }
};

function makeTodoModifyRequest(id) {
  return {
    type: TODO_MODIFY_REQUEST,
    id
  };
}

export const todoModifyRequest = id => (dispatch, getState) => {
  if (getState().todoState.commentManagement.status === "requested") {
    dispatch(cancellCommentRequest());
  }
  dispatch(makeTodoModifyRequest(id));
};

export function todoModifyCancel(id) {
  return {
    type: TODO_MODIFY_CANCEL,
    id
  };
}

export function todoModifySuccess(id, text) {
  return {
    type: TODO_MODIFY_SUCCESS,
    id,
    text
  };
}

function makeCommentRequest(id) {
  return {
    type: COMMENT_REQUEST,
    id
  };
}

export const commentRequest = id => (dispatch, getState) => {
  if (getState().todoState.modify.status === "requested") {
    const index = getState().todoState.modify.id;
    dispatch(todoModifyCancel(index));
  }
  dispatch(makeCommentRequest(id));
};

export function cancellCommentRequest() {
  return {
    type: COMMENT_REQUEST_CANCELLED
  };
}

export function addComment(comment, id) {
  return {
    type: ADD_COMMENT,
    comment,
    id: commentIndex++,
    todoIndex: id
  };
}

export function moveComment(commentId, todoId) {
  return {
    type: MOVE_COMMENT,
    commentId,
    todoId
  };
}

export function modifyComment(comment, id, commentId) {
  return {
    type: MODIFY_COMMENT,
    comment,
    commentId,
    todoIndex: id
  };
}

export function cancelModifyComment() {
  return {
    type: CANCEL_MODIFY_COMMENT
  };
}

export function deleteCommentsOfTodo(id) {
  return {
    type: DELETE_COMMENTS,
    todoIndex: id
  };
}

export function setCommentModify(id) {
  return {
    type: SET_COMMENT_MODIFY,
    commentId: id
  };
}

export function deleteComment(id) {
  return {
    type: DELETE_A_COMMENT,
    commentId: id
  };
}

export function makeArchiveTodo(todo, archiveId) {
  return {
    type: ARCHIVE_TODO,
    todo,
    archiveId
  };
}

export function makeArchiveCommentsOfTodo(id, archivedComments, archiveId) {
  return {
    type: ARCHIVE_COMMENTS_OF_TODO,
    todoId: id,
    archivedComments,
    archiveId
  };
}

const findCommentsForTodo = (id, comments) => {
  let commentsForTodo = [];
  if (comments.length > 0) {
    commentsForTodo = comments.filter(comment => comment.todoIndex === id);
  }
  return commentsForTodo;
};

let archiveId = 0;

export const archiveTodo = id => (dispatch, getState) => {
  archiveId++;
  const state = getState().todoState;

  const commentsForTodo = findCommentsForTodo(id, state.comments.comments);

  if (commentsForTodo.length > 0)
    dispatch(makeArchiveCommentsOfTodo(id, commentsForTodo, archiveId));

  const subTasks = getSubTasksOfTodo(state, id);
  if (subTasks.length > 0)
    dispatch(makeArchiveSubTasksOfTodo(subTasks, archiveId));

  const todo = state.todos.todos.filter(todo => todo.id === id);
  dispatch(makeArchiveTodo(todo[0], archiveId));
  dispatch(deleteTodo(id, todo[0].fromWhere));
  persistWithBlockState(dispatch, getState, id);
};

const makeArchiveSubTasksOfTodo = (subTasks, archiveId) => {
  return {
    type: ARCHIVE_SUBTASKS,
    archiveId,
    subTasks
  };
};

const findSubTasksForArchivedTodo = (todoId, archives) => {
  let subTasks = [];
  if (archives.length > 0)
    subTasks = archives.filter(subTask => subTask.todoId === todoId);

  return subTasks;
};

export const reactivateTodo = ({ todo, fromWhere, completed, archiveId }) => (
  dispatch,
  getState
) => {
  const state = getState().todoState;
  const archiveTodo = state.archiveTodos.todos.filter(
    item => item.archiveId === archiveId
  );
  const todoId = archiveTodo[0].id;

  const commentsForTodo = findCommentsForTodo(
    todoId,
    state.archiveComments.comments
  );
  const subTasksForTodo = findSubTasksForArchivedTodo(
    todoId,
    state.archiveSubTasks.subTasks
  );

  dispatch(makeDeleteArchiveTodo(archiveId));
  dispatch(makeAddTodo(todo, fromWhere, completed));

  const newState = getState().todoState;
  const newTodo = newState.todos.todos.filter(item => item.todo === todo);
  const newTodoId = newTodo[0].id;

  if (commentsForTodo.length > 0) {
    commentsForTodo.forEach(comment => {
      dispatch(addComment(comment.comment, newTodoId));
    });
    dispatch(deleteArchiveCommentsOfTodo(archiveId));
  }

  if (subTasksForTodo.length > 0) {
    subTasksForTodo.forEach(subTask => {
      dispatch(
        addSubTask({
          text: subTask.subTask,
          parentId: newTodoId,
          description: subTask.description,
          dueDate: subTask.dueDate,
          status: subTask.status
        })
      );
    });
    dispatch(deleteArchiveSubTasksOfTodo(archiveId));
  }
};

export function deleteArchiveCommentsOfTodo(archiveId) {
  return {
    type: DELETE_ARCHIVE_COMMENTS_OF_TODO,
    archiveId
  };
}

export function deleteArchiveSubTasksOfTodo(archiveId) {
  return {
    type: DELETE_ARCHIVE_SUBTASKS_OF_TODO,
    archiveId
  };
}

export function openTodoBoard(todoId) {
  return {
    type: OPENED_TODO_BOARD,
    todoId
  };
}

export function cancelTodoBoard() {
  return {
    type: CLOSE_TODO_BOARD
  };
}

let subTaskId = 0;

export function addSubTask({ text, parentId, description, dueDate, status }) {
  return {
    type: ADD_SUBTASK,
    subTask: text,
    id: subTaskId++,
    todoId: parentId,
    description: description || "",
    status: status || "active",
    dueDate: dueDate || "due date"
  };
}

export function updateSubTask({
  id,
  subTask,
  description,
  dueDate,
  status,
  todoId
}) {
  return {
    type: UPDATE_SUBTASK,
    id,
    subTask: !!subTask ? subTask : null,
    description: !!description ? description : null,
    dueDate: !!dueDate ? dueDate : null,
    status: !!status ? status : null,
    todoId: !!todoId ? todoId : null
  };
}

export function deleteOneSubTask(id) {
  return {
    type: DELETE_A_SUBTASK,
    id
  };
}

export function todoBlocksIt(idOfBlocking, idOfBlockedBy) {
  return {
    type: ADD_TO_BLOCK_LIST_OF_TODO,
    idOfBlocking,
    idOfBlockedBy
  };
}
