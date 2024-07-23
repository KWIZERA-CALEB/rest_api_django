import React, { useEffect, useState } from 'react'
import { fetchTodos, destroyTodo } from '../../services/todoservice'
import { Link } from 'react-router-dom'

const SingleTodo = () => {
    const [todos, setTodos] = useState([])

    useEffect(()=> {
        const getTodos = async ()=> {
            try {
                const fetchedTodos = await fetchTodos()
                setTodos(fetchedTodos)
            }catch(error) {
                console.log(error)
                throw error
            }
        }
        
        getTodos()
    }, [])

    const handleDeleteTodo = async (id)=> {
        try {
            const destroy = await destroyTodo(id)
            setTodos(todos.filter(todo => todo.id !== id))
            return destroy
        }catch(error) {
            console.log(error)
            throw error
        }
    }

    const renderedTodos = []
    for(let i = 0; i < todos.length; i++) {
        renderedTodos.push(
            <>
                <div key={todos[i].id}>
                    <h3>{todos[i].title}</h3>
                    <button onClick={()=> handleDeleteTodo(todos[i].id)}>Delete</button>
                    <Link to={`/todo/${todos[i].id}`}>See More</Link>
                    <hr></hr>
                </div>
            </>
        )
    }

  return (
    <div>
      {renderedTodos}
    </div>
  )
}

export default SingleTodo
