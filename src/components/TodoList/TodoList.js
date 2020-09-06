import React , { Component } from 'react';
import './TodoList.css';
import TodoForm from '../TodoForm/TodoForm.js';
import TodoListItems from '../TodoListItems/TodoListItems.js';

class TodoList extends Component {
  state = {
    todos: [],
    newTodo: "",
  };

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let todosLength = this.state.todos.length;
    if (this.state.newTodo === "") {
      return;
    }
    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          id: (todosLength += 1),
          title: this.state.newTodo,
          isCompleted: false,
        },
      ],
    });
  };

  toggleCompleted = (event, index) => {
    const todoCompleted = this.state.todos.filter((todo) => {
      if (todo.id === index + 1) {
        todo.isCompleted = event.target.checked;
      }
      return todo;
    });
    this.setState({ todos: todoCompleted });
  };

  removeTodo = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({
      todos,
    });
  };

  editTodo = (index) => {
    const newTodo = prompt('Let\'s make something changes');
    const { todos } = this.state;
    todos.filter(todo => {
      if (todo.id === index + 1) {
        todo.title = newTodo;
      }
      return todo;
    });
    this.setState({ todos });
    
  }

  render() {
    return (
      <div className="todo-list container d-flex-column w-50 mt-5 pb-3">
        <TodoForm
          todos={this.state.todos}
          newTodo={this.state.newTodo}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TodoListItems
          todos={this.state.todos}
          handleOnChange={this.toggleCompleted}
          handleOnRemove={this.removeTodo}
          handleOnEdit={this.editTodo}
        />
      </div>
    );
  }
}

export default TodoList
