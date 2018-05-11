import { createSelector } from "reselect";

import { filters_constants } from "../types";

export const getSingleTodo = ({ todos }, todoId) =>
  todos.filter(({ id }) => id === todoId);

export const getTotalTodosByFilter = createSelector(
  [state => state.todos, state => state.archiveTodos, state => state.filter],
  (todos, archive, filter) => {
    switch (filter) {
      case filters_constants.ALL:
        return todos.todosIds.length;
      case filters_constants.COMPLETED: {
        const effectiveTodos = todos.todos.filter(todo => todo.completed);
        return effectiveTodos.length;
      }
      case filters_constants.ACTIVE: {
        const effectiveTodos = todos.todos.filter(todo => !todo.completed);
        return effectiveTodos.length;
      }
      case filters_constants.ARCHIVES:
        return archive.todosIds.length;
      default:
        return todos.todosIds.length;
    }
  }
);

export const getTotalTodos = createSelector(
  [
    state => state.todos.todosIds.length,
    state => state.archiveTodos.todosIds.length
  ],
  (todosLength, archivedLength) => todosLength + archivedLength
);

export const getTotalCommentsForTodo = createSelector(
  [
    state => state.commentManagement,
    state => state.comments,
    state => state.filter,
    state => state.archiveComments
  ],
  (commentManagement, comments, filter, archiveComments) => {
    let commentsForActiveTodo = [];
    if (filter !== filters_constants.ARCHIVES) {
      if (commentManagement.status !== "" && comments.comments.length > 0) {
        commentsForActiveTodo = comments.comments.filter(
          comment => comment.todoIndex === commentManagement.id
        );
      }
      return commentsForActiveTodo;
    } else {
      if (archiveComments.commentIds.length > 0) {
        commentsForActiveTodo = archiveComments.comments.filter(
          comment => comment.todoIndex === commentManagement.id
        );
      }
      return commentsForActiveTodo;
    }
  }
);

export const getTodos = createSelector(
  [
    state => state.todoState.todos,
    state => state.todoState.archiveTodos,
    state => state.todoState.filter,
    state => state.todoState.error
  ],
  (todos, archives, filter, error) => {
    if (error === "") {
      switch (filter) {
        case filters_constants.ALL:
          return todos.todos;
        case filters_constants.COMPLETED: {
          return todos.todos.filter(todo => todo.completed);
        }
        case filters_constants.ACTIVE: {
          return todos.todos.filter(todo => !todo.completed);
        }
        case filters_constants.ARCHIVES: {
          return archives.todos;
        }
        default:
          return todos.todos;
      }
    } else {
      let str = error.split(" ", 1);
      if (error.toLowerCase().includes("active")) {
        return todos.todos.filter(
          todo => !todo.completed && todo.todo === str[0]
        );
      } else if (error.toLowerCase().includes("completed")) {
        return todos.todos.filter(
          todo => todo.completed && todo.todo === str[0]
        );
      } else if (error.toLowerCase().includes("archived")) {
        return archives.todos.filter(todo => todo.todo === str[0]);
      }
    }
  }
);

export const getAllTodosByFilter = ({ todos, archiveTodos }, filter) => {
  switch (filter) {
    case filters_constants.ALL:
      return todos.todos;
    case filters_constants.COMPLETED: {
      return todos.todos.filter(todo => todo.completed);
    }
    case filters_constants.ACTIVE: {
      return todos.todos.filter(todo => !todo.completed);
    }
    case filters_constants.ARCHIVES: {
      return archiveTodos.todos;
    }
    default:
      return todos.todos;
  }
};

export const getSubTasksOfTodo = (initState, todoId) => {
  const state = initState.subTasks;
  let result = [];
  if (state !== {} && todoId !== -1) {
    for (let key in state) {
      if (state[key].todoId === todoId) {
        result.push(state[key]);
      }
    }
  }
  return result;
};
