import BasicComponents from "../../components/BasicComponents";

import { withCondition, withMappedProps } from "../../components/HOC";

const ConditionalDropdown = withCondition(BasicComponents.Dropdown);

const FilteredCommentDropdown = withMappedProps(
  ({ items, filteredCondition, ...restProps }) => ({
    options: items
      .filter(item => item.id !== filteredCondition)
      .map(dest => dest.todo.substring(0, 20).concat("..."))
  })
)(ConditionalDropdown);

export default FilteredCommentDropdown;
