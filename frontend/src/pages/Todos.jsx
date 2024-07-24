import React, { useState, useEffect } from 'react'
import SingleTodo from '../components/atoms/SingleTodo'
import { Link, useNavigate } from 'react-router-dom'


const Todos = () => {
  const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem('accesstoken')
      
      if (!token) {
        navigate('/')
        return;
      }

  }, [navigate])

  return (
    <div>
      Todos
      <SingleTodo />
      <Link to={'/add'}>Add Todo</Link>
    </div>
  )
}

export default Todos
