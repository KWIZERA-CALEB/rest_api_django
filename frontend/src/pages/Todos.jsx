import React from 'react'
import SingleTodo from '../components/atoms/SingleTodo'
import { Link } from 'react-router-dom'

const Todos = () => {
  return (
    <div>
      Todos
      <SingleTodo />
      <Link to={'/add'}>Add Todo</Link>
    </div>
  )
}

export default Todos
