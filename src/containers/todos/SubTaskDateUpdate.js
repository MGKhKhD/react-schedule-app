import React, { Component } from "react";
import { connect } from "react-redux";
import BasicComponents, { BasicPortal } from "../../components/BasicComponents";
import SubTaskDueDateInitSetup from "../../components/todoComponents/SubTaskDueDateInitSetup";
import SimpleDateSetter from "../../components/todoComponents/SimpleDateSetter";

import { updateSubTask } from "../../actions/todoActions";

const toolTipStyle = {
  position: "fixed",
  padding: "8px",
  background: "#3c8478",
  color: "white",
  textAlign: "center",
  fontSize: "16px"
};

class SubTaskDateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { showingTooltip: true };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.showingTooltip && nextProps.dateUpdate) {
      this.setState({ showingTooltip: true });
    }

    if (this.state.showingTooltip) {
      this.props.toolTipStatus();
    }
  }

  handleSetDate = date => {
    if (date) {
      this.props.updateSubTask({
        ...this.props.subTask,
        dueDate: `${date.day}/${date.month}/${date.year}`
      });
    }
    this.setState({ showingTooltip: false });
    this.props.cancelHeaderClick();
  };

  render() {
    const { dueDate } = this.props;
    return (
      <SubTaskDueDateInitSetup>
        {({ position }) => {
          const style = { ...toolTipStyle, ...position };
          return (
            <React.Fragment>
              <BasicComponents.Span>{dueDate}</BasicComponents.Span>
              {this.state.showingTooltip && (
                <BasicPortal>
                  <div style={style}>
                    <SimpleDateSetter closeToolTipDate={this.handleSetDate} />
                  </div>
                </BasicPortal>
              )}
            </React.Fragment>
          );
        }}
      </SubTaskDueDateInitSetup>
    );
  }
}

export default connect(null, { updateSubTask })(SubTaskDateUpdate);
