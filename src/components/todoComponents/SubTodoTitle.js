import { withBranch } from "../HOC";

import SubTodoTitleInput from "../../containers/todos/SubTodoTitleInput";
import SubTodoTitleH from "./SubTodoTitleH";

const SubTodoTitle = withBranch(SubTodoTitleInput, SubTodoTitleH);

export default SubTodoTitle;
