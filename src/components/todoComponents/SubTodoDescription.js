import { withBranch } from "../HOC";

import SubTodoDescriptionInput from "../../containers/todos/SubTodoDescriptionInput";
import SubTodoDescriptionP from "./SubTodoDescriptionP";

const SubTodoDescription = withBranch(
  SubTodoDescriptionInput,
  SubTodoDescriptionP
);

export default SubTodoDescription;
