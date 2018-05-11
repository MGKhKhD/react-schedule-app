import { combineReducers } from "redux";

import {
  ADD_TODO,
  SET_FILTER,
  TODO_CLICK,
  TODO_DELETE,
  ARCHIVE_TODO_DELETE,
  ARCHIVE_TODO,
  ARCHIVE_COMMENTS_OF_TODO,
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
  filters_constants,
  MODIFY_COMMENT,
  CANCEL_MODIFY_COMMENT,
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

import { initialTodoState, initialCommentState } from "../mockedData";

// let initialTodoState = {
//   todosIds: [],
//   todos: []
// };

export function todos(state = initialTodoState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todosIds: [...state.todosIds, action.id],
        todos: [
          ...state.todos,
          {
            todo: action.text,
            id: action.id,
            completed: action.completed,
            fromWhere: action.fromWhere
          }
        ]
      };
    case TODO_DELETE:
      return {
        ...state,
        todosIds: state.todosIds.filter(index => index !== action.id),
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case TODO_CLICK:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        })
      };
    case TODO_MODIFY_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(entity => {
          if (entity.id === action.id) {
            return { ...entity, todo: action.text };
          } else {
            return entity;
          }
        })
      };
    case TOGGLE_ALL_TODOS: {
      let superStatus = state.todos.every(todo => todo.completed);
      return {
        ...state,
        todos: state.todos.map(todo => {
          return { ...todo, completed: !superStatus };
        })
      };
    }
    case DELETE_ALL_COMPLETED_TODOS: {
      let newTodos = state.todos.filter(todo => !todo.completed);
      let newIds = [];
      newTodos.forEach(todo => newIds.push(todo.id));
      return {
        ...state,
        todosIds: newIds,
        todos: newTodos
      };
    }
    default:
      return state;
  }
}

export function filter(state = filters_constants.ALL, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function modify(state = { status: "", id: -1 }, action) {
  switch (action.type) {
    case TODO_MODIFY_REQUEST:
      return { status: "requested", id: action.id };
    case TODO_MODIFY_CANCEL:
      return { status: "canceled", id: action.id };
    default:
      return state;
  }
}

export function commentManagement(
  state = { status: "", id: -1, commentId: -1 },
  action
) {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { commentId: -1, status: "requested", id: action.id };
    case COMMENT_REQUEST_CANCELLED:
      return { commentId: -1, status: "", id: -1 };
    case SET_COMMENT_MODIFY:
      return { ...state, status: "needModify", commentId: action.commentId };
    case CANCEL_MODIFY_COMMENT:
      return { ...state, status: "requested", commentId: -1 };
    default:
      return state;
  }
}

// let initialCommentState = {
//   commentIds: [],
//   comments: []
// };

export function comments(state = initialCommentState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        commentIds: [...state.commentIds, action.id],
        comments: [
          ...state.comments,
          {
            comment: action.comment,
            id: action.id,
            todoIndex: action.todoIndex
          }
        ]
      };
    case DELETE_COMMENTS: {
      let effectiveComments = state.comments.filter(
        comment => comment.todoIndex === action.todoIndex
      );
      return {
        ...state,
        commentIds: state.commentIds.filter(id => {
          let keep = true;
          effectiveComments.forEach(comment => {
            if (comment.id === id) keep = false;
          });
          return keep;
        }),
        comments: state.comments.filter(
          comment => effectiveComments.indexOf(comment) === -1
        )
      };
    }
    case DELETE_A_COMMENT: {
      return {
        ...state,
        commentIds: state.commentIds.filter(id => id !== action.commentId),
        comments: state.comments.filter(
          comment => comment.id !== action.commentId
        )
      };
    }
    case MODIFY_COMMENT: {
      const oldIds = state.commentIds.filter(id => id !== action.commentId);
      const oldComments = state.comments.filter(
        comment => comment.id !== action.commentId
      );
      return {
        ...state,
        commentIds: [...oldIds, action.commentId],
        comments: [
          ...oldComments,
          {
            comment: action.comment,
            id: action.commentId,
            todoIndex: action.todoIndex
          }
        ]
      };
    }
    case MOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.commentId) {
            return { ...comment, todoIndex: action.todoId };
          }
          return comment;
        })
      };
    default:
      return state;
  }
}

export const error = (state = "", action) => {
  switch (action.type) {
    case SET_TODO_ERROR:
      return action.error;
    case CANCEL_TODO_ERROR:
      return "";
    default:
      return state;
  }
};

export function archiveTodos(state = { todosIds: [], todos: [] }, action) {
  switch (action.type) {
    case ARCHIVE_TODO: {
      const { todo } = action;
      return {
        ...state,
        todosIds: [...state.todosIds, action.archiveId],
        todos: [
          ...state.todos,
          {
            ...todo,
            archiveId: action.archiveId
          }
        ]
      };
    }
    case ARCHIVE_TODO_DELETE:
      return {
        ...state,
        todosIds: state.todosIds.filter(index => index !== action.archiveId),
        todos: state.todos.filter(todo => todo.archiveId !== action.archiveId)
      };
    default:
      return state;
  }
}

export function archiveComments(
  state = { commentIds: [], comments: [] },
  action
) {
  switch (action.type) {
    case ARCHIVE_COMMENTS_OF_TODO: {
      let archivedComments = action.archivedComments.map(comment => ({
        ...comment,
        archiveId: action.archiveId
      }));
      return {
        ...state,
        commentIds: [...state.commentIds, action.archiveId],
        comments: [...state.comments, ...archivedComments]
      };
    }
    case DELETE_ARCHIVE_COMMENTS_OF_TODO: {
      return {
        commentIds: state.commentIds.filter(idx => idx !== action.archiveId),
        comments: state.comments.filter(
          comment => comment.archiveId !== action.archiveId
        )
      };
    }
    default:
      return state;
  }
}

export function todoBoard(state = { todoId: -1 }, action) {
  switch (action.type) {
    case OPENED_TODO_BOARD:
      return { todoId: action.todoId };
    case CLOSE_TODO_BOARD:
      return {
        ...state,
        todoId: -1
      };
    default:
      return state;
  }
}

export function subTasks(state = {}, action) {
  switch (action.type) {
    case ADD_SUBTASK:
      return {
        ...state,
        subTaskIds: !state.subTaskIds
          ? [action.id]
          : [...state.subTaskIds, action.id],
        [`${action.id}`]: {
          id: action.id,
          subTask: action.subTask,
          todoId: action.todoId,
          description: action.description,
          status: action.status,
          dueDate: action.dueDate
        }
      };
    case UPDATE_SUBTASK: {
      return {
        ...state,
        [`${action.id}`]: {
          ...state[`${action.id}`],
          subTask: !action.subTask
            ? state[`${action.id}`].subTask
            : action.subTask,
          description: !action.description
            ? state[`${action.id}`].description
            : action.description,
          status: !action.status ? state[`${action.id}`].status : action.status,
          dueDate: !action.dueDate
            ? state[`${action.id}`].dueDate
            : action.dueDate
        }
      };
    }
    case DELETE_A_SUBTASK: {
      let newState = {};
      for (let key in state) {
        if (state[key].id !== action.id) {
          newState = { ...newState, [key]: state[key] };
        }
      }
      return {
        ...newState,
        subTaskIds: state.subTaskIds.filter(idx => idx !== action.id)
      };
    }
    default:
      return state;
  }
}

export function archiveSubTasks(
  state = { archiveIds: [], subTasks: [] },
  action
) {
  switch (action.type) {
    case ARCHIVE_SUBTASKS: {
      let archives = action.subTasks.map(subTask => ({
        ...subTask,
        archiveId: action.archiveId
      }));
      return {
        ...state,
        archiveIds: [...state.archiveIds, action.archiveId],
        subTasks: [...state.subTasks, ...archives]
      };
    }
    case DELETE_ARCHIVE_SUBTASKS_OF_TODO: {
      return {
        archiveIds: state.archiveIds.filter(idx => idx !== action.archiveId),
        subTasks: state.subTasks.filter(
          subTask => subTask.archiveId !== action.archiveId
        )
      };
    }
    default:
      return state;
  }
}

export function blockingInfo(state = {}, action) {
  switch (action.type) {
    case ADD_TO_BLOCK_LIST_OF_TODO:
      return {
        ...state,
        [`${action.idOfBlocking}`]: !state[`${action.idOfBlocking}`]
          ? [action.idOfBlockedBy]
          : [...state[`${action.idOfBlocking}`], action.idOfBlockedBy]
      };
    case DELETE_TODO_FROM_BLOCKING_ENTRY: {
      let newState = {};
      for (let key in state) {
        if (key !== action.idOfBlocking) {
          newState = { ...newState, [key]: [...state[key]] };
        }
      }
      return newState;
    }
    case DELETE_TODO_FROM_BLOCKEDBY_LIST_OF_TODO: {
      let newState = {};
      for (let key in state) {
        if (key === action.idOfBlockedBy) {
          newState = {
            ...newState,
            [key]: state[key].filter(idx => idx !== action.idOfBlocking)
          };
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

const todoReducers = combineReducers({
  todos,
  filter,
  modify,
  commentManagement,
  comments,
  error,
  archiveTodos,
  archiveComments,
  todoBoard,
  subTasks,
  archiveSubTasks,
  blockingInfo
});

export default todoReducers;
