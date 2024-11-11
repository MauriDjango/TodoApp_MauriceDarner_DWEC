import React, { useMemo } from 'react'
import Todo from './Todo.jsx'
import PropTypes from 'prop-types'


const Todos = ({todos, setTodos, setIsEditing, setTodo}) => {

  Todos.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    setTodos: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired,
    setTodo: PropTypes.func.isRequired,
  }

  const getSortLevel = (todo) => {
    if (todo.priority && !todo.complete) return 0; // Priority uncompleted
    if (!todo.priority && !todo.complete) return 1; // Non-priority uncompleted
    if (todo.priority && todo.complete) return 2;   // Priority completed
    return 3;                                       // Non-priority completed
  };

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => getSortLevel(a) - getSortLevel(b));
  }, [todos]);

  const editTodo = (id) => {
    setIsEditing(true)
    setTodo(todos.find(todo => todo.id === id));
  };

  const deleteTodo = (id) => {
    console.log('Deleting Todo', id)
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  return (
    <ul className={'list-group'}>
      {sortedTodos.map((todo) => {
        return <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
        />
      })}
    </ul>
  )
}

export default Todos