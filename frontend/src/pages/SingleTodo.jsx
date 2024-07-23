import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSingleTodo } from '../services/todoservice'
import { Link } from 'react-router-dom'

const SingleTodo = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState({id:'', title:'', description:''})

    useEffect(()=> {
        const fetchTodoDetails = async ()=> {
            try{
                const todo = await fetchSingleTodo(id)
                setTodo(todo)
            }catch(error) {
                console.log(error)
                throw error
            }
        }

        fetchTodoDetails()
    }, [])

  return (
    <div key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <Link to={`/edit/${todo.id}`}>Edit</Link>
    </div>
  )
}

export default SingleTodo
