import React, { useEffect, useState } from 'react'
import { fetchTodos, destroyTodo } from '../../services/todoservice'
import { Link } from 'react-router-dom'
import RecSkeleton from './RecSkeleton'

const SingleTodo = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const getTodos = async ()=> {
            try {
                const fetchedTodos = await fetchTodos()
                setTodos(fetchedTodos)
                setLoading(true)
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
                <Link to={`/todo/${todos[i].id}`}>
                    <div key={todos[i].id} className="p-[30px] rounded-[12px] h-[170px] border-[2px] border-solid border-gray-300 hover:border-blue-500 hover:cursor-pointer">
                        <div className="font-bold text-[18px] cursor-pointer text-slate-800 uppercase">{todos[i].title}</div>
                        <button onClick={()=> handleDeleteTodo(todos[i].id)}></button>
                    </div>
                </Link>
            </>
        )
    }

  return (
    <>
      {loading ? renderedTodos : <RecSkeleton />}
    </>
  )
}

export default SingleTodo
