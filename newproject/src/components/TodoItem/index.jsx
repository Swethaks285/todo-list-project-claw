import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '',
  }

  handleEdit = () => {
    const {todoDetails} = this.props;
    this.setState({editing: true, updatedTitle: todoDetails.title})
  }

  handleSave = () => {
    // const {todoDetails} = this.props
    // const {updatedTitle} = this.state
    this.setState({editing: false})
    // Call a function to save updated title (not implemented in this code)
  }

  handleChange = e => {
    this.setState({updatedTitle: e.target.value})
  }

  render() {
    const { todoDetails, deleteTodo, toggleComplete, newTodoCount} = this.props;
    const {editing, updatedTitle} = this.state
    return (
      <li
        className={todoDetails.completed ? 'todo-item completed' : 'todo-item'}
      >
        {editing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={this.handleChange}
              className="saveBtns"
            />
            <button className="saveBtn" onClick={this.handleSave} type="button">
              Save
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todoDetails.completed}
              onChange={() => toggleComplete(todoDetails.id)}
            />
            <p
              className={
                todoDetails.completed
                  ? 'todo-item-completed title'
                  : 'todo-item title'
              }
            >
              {todoDetails.title}
            </p>
            <div>
              <button
                className="btnEdit"
                onClick={this.handleEdit}
                type="button"
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todoDetails.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    )
  }
}

export default TodoItem;