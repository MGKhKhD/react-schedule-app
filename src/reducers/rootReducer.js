import { combineReducers } from "redux";

import todoReducers from "./todoReducers";

const rootReducer = combineReducers({
  todoState: todoReducers
});

export default rootReducer;
