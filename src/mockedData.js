import faker from "faker";

let todosIds = [0, 1];
let todos = [];

let commentIds = [0, 1, 2, 3];
let comments = [];

todosIds.forEach(id =>
  todos.push({
    todo: Math.random() > 0.5 ? faker.lorem.sentence() : faker.lorem.word(),
    id: id,
    completed: false,
    fromWhere: "todosPage"
  })
);

commentIds.forEach(id => {
  if (id < 2) {
    comments.push({
      comment: faker.lorem.paragraph(),
      id: id,
      todoIndex: 0
    });
  } else {
    comments.push({
      comment: faker.lorem.paragraph(),
      id: id,
      todoIndex: 1
    });
  }
});

export const initialTodoState = {
  todosIds,
  todos
};

export const initialCommentState = {
  commentIds,
  comments
};
