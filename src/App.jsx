import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario.jsx'
import Todos from './components/Todos.jsx'


const initialTodos = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripcion 1",
    state: true,
    priority: false
  },
  {
    id: 2,  // incrementing for uniqueness
    title: "Tarea 2",
    description: "Descripcion 2",
    state: false,
    priority: true
  },
  {
    id: 3,
    title: "Tarea 3",
    description: "Descripcion 3",
    state: false,
    priority: true
  },
  {
    id: 4,
    title: "Tarea 4",
    description: "Descripcion 4",
    state: true,
    priority: false
  }
];

const initialTodo = {
  id: null,
  title: "Que tarea es?",
  description: "Porque no lo has hecho ya?",
  complete: false,
  priority: false
}

const App = () => {

  const [todo, setTodo] = useState(initialTodo)
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || initialTodos);
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    updateTodos()
  }, [todos])

  const updateTodos = () => localStorage.setItem("todos", JSON.stringify(todos))

  const resetTodo = () => {
    setTodo(initialTodo)
  }

  return (
    <div className='container mb-2'>
      <h1 className='my-4'>Formulario</h1>
      <Formulario
        todo={todo}
        setTodo={setTodo}
        setTodos={setTodos}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        resetTodo={resetTodo}
      />
      <Todos
        todos={todos}
        setTodos={setTodos}
        setIsEditing={setIsEditing}
        setTodo={setTodo}
      ></Todos>
    </div>
  )
}

export default App