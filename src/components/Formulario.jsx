import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'


const Formulario = ({todo, setTodo, setTodos, isEditing, setIsEditing, resetTodo}) => {
  Formulario.propTypes = {
    todo: PropTypes.object.isRequired,
    setTodo: PropTypes.func.isRequired,
    setTodos: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    setIsEditing: PropTypes.func.isRequired,
    resetTodo: PropTypes.func.isRequired,
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) {
      setTodos(prevTodos => {
        return prevTodos.map(prevTodo => {
          return prevTodo.id === todo.id ?
            todo :
            prevTodo;
        });
      });
    } else {
      const newTodo = { ...todo, id: DateTime.now().toISO() };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setIsEditing(false);
    }
    resetTodo()
  };

  const handleChange = e => {
    const { name, value, checked, type } = e.target;
    setTodo({
      ...todo,
      [name]:
        name === 'complete'
          ? value === 'complete' // Converts "complete" to true, "pending" to false
          : type === "checkbox"
            ? checked
            : value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder='Introduce la tarea'
          className='form-control mb-2'
          value = {todo.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder='Introduce la descripcion'
          className='form-control mb-2'
          value = {todo.description}
          onChange={handleChange}
          />
          <select
            name="complete"
            className='form-control mb-2'
            value = {todo.complete ? 'complete' : 'pending'}
            onChange={handleChange}
            >
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
          </select>
          <div className='form-checked mb2'>
              <input
                className='form-checked mb2'
                type="checkbox"
                name="priority"
                id="inputCheck"
                checked={todo.priority}
                onChange={handleChange}
                />
                <label
                  className='form-checked mb2'
                  htmlFor="inputCheck"
                  >
                    Prioridad
                </label>
          </div>

          <button
            type='submit'
            className='btn btn-primary'
          >
            {isEditing ? "Edit" : "Add"}
          </button>
      </form>
    </div>
  )
}

export default Formulario