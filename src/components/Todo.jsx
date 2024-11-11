import React from 'react';
import PropTypes from 'prop-types';


// Define PropTypes outside the function to follow convention
const Todo = ({ todo, deleteTodo, editTodo, toggleTodo }) => {
  Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  // Determine the button text based on the todo's completion state
  const toggleButtonText = todo.complete ? 'Mark as Pending' : 'Mark as Complete';
  const toggleButtonClass = todo.complete ? 'btn-sm btn-success' : 'btn-sm btn-warning';

  return (
    <li className="list-group-item">
      <div className="d-flex w-100 justify-content-between">
        <h5 className={todo.complete ? "completed" : ""}>{todo.title}</h5>
        <small>Prioridad: {todo.priority ? 'Si' : 'No'}</small>
      </div>
      <p className="mb-1">{todo.description}</p>
      <small>{todo.complete ? 'Complete' : 'Pending'}</small>
      <div className="todo-btn">
        <button
          onClick={() => deleteTodo(todo.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
        <button
          onClick={() => editTodo(todo.id)}
          className="btn btn-sm btn-info"
        >
          Editar
        </button>
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`btn ${toggleButtonClass}`}
        >
          {toggleButtonText}
        </button>
      </div>
    </li>
  );
}

export default Todo;
