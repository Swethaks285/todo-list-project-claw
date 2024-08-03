import { Component } from 'react';
import TodoItem from '../TodoItem';
import './index.css';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../api/api';

class SimpleTodos extends Component {
  state = {
    todosList: [],
    newTodoTitle: '',
    newTodoCount: '',
  };

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    const todosList = await getTodos();
    this.setState({ todosList });
  };

  handleAddTodo = async () => {
    const { newTodoTitle, newTodoCount } = this.state;
    const newTodos = Array.from({ length: newTodoCount }, (_, i) => ({
      id: Date.now() + i,
      title: newTodoTitle,
      completed: false,
      priority: 'MEDIUM',
      status: 'TO DO',
      category: 'HOME',
      dueDate: '2024-01-01',
    }));

    for (const todo of newTodos) {
      await addTodo(todo);
    }

    this.setState({ newTodoTitle: '', newTodoCount: '' });
    this.fetchTodos();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    this.fetchTodos();
  };

  handleToggleComplete = async (id) => {
    const todo = this.state.todosList.find((todo) => todo.id === id);
    const updatedTodo = {
      ...todo,
      status: todo.status === 'TO DO' ? 'DONE' : 'TO DO',
    };
    await updateTodo(id, updatedTodo);
    this.fetchTodos();
  };

  render() {
    const { todosList, newTodoTitle, newTodoCount } = this.state;
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo">
            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              onChange={this.handleChange}
              placeholder="Enter todo title..."
              className="inputOne"
            />
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              onChange={this.handleChange}
              placeholder="Enter number of todos"
              className="inputOne"
            />
            <button className="addBtn" onClick={this.handleAddTodo} type="button">
              Add
            </button>
            console.log(newTodoTitle)
          </div>
          <ul className="todos-list">
            {todosList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={this.handleDeleteTodo}
                toggleComplete={this.handleToggleComplete}
                fetchTodos={this.fetchTodos}  // Pass fetchTodos to each TodoItem
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SimpleTodos;