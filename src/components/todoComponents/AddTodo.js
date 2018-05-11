import React, { Component } from "react";
import { filters_constants } from "../../types";

import BasicComponents from "../BasicComponents";
import TodoMessage from "./TodoMessage";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.inputText = null;
    this.setInputRef = element => {
      this.inputText = element;
    };
    this.setFocus = () => {
      if (this.inputText) this.inputText.focus();
    };
  }

  componentDidMount() {
    this.setFocus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commentStatus !== "" && nextProps.commentStatus === "") {
      this.setFocus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let todo = this.state.todo.trim();
    this.props.addTodo(todo, "todosPage");
    e.target.value = "";
    this.setState({ todo: "" });
  }

  handleChange = e => {
    if (this.props.commentStatus !== "") {
      this.props.cancellCommentRequest();
    }
    if (this.props.filter === filters_constants.ARCHIVES) {
      this.props.setFilter(filters_constants.ALL);
    }
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    if (this.props.errorMessage !== "") {
      this.props.cancelErrorTodo();
    }
  };

  render() {
    return (
      <div>
        <TodoMessage
          condition={this.props.errorMessage !== ""}
          errorMessage={this.props.errorMessage}
          setFilter={this.props.setFilter}
          cancelErrorTodo={this.props.cancelErrorTodo}
        />
        <BasicComponents.FormWithInput
          inputRef={this.setInputRef}
          inputClassName="form-control mb-2 mr-sm-2 mb-sm-0"
          buttonClassName="btn btn-primary btn-sm mr-1"
          placeholder="Add todo"
          name="todo"
          inputValue={this.state.todo}
          buttonValue="Add"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default AddTodo;
