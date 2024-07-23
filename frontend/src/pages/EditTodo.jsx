import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingleTodo, editSingleTodo } from '../services/todoservice'

const EditTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [todo, setTodo] = useState({id:'', title:'', description:''})


    const { id } = useParams()
    const navigate = useNavigate()


    const handleTitleChange = (e)=> {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e)=> {
        setDescription(e.target.value)
    }

    useEffect(()=> {
        const fetchTodoDetails = async ()=> {
            try{
                const todo = await fetchSingleTodo(id)
                setTodo(todo)
                setTitle(todo.title)
                setDescription(todo.description)
            }catch(error) {
                console.log(error)
                throw error
            }
        }

        fetchTodoDetails()
    }, [])

    const handleEditTodo = async (e) => {
        e.preventDefault()
        try {

            const data = {
                title,
                description
            }

            const newTodo = await editSingleTodo(id, data)
            navigate(`/todo/${todo.id}`)
            return newTodo
        }catch(error) {
            console.log(error)
            throw error
        }
    }

  return (
    <div>
      <form onSubmit={handleEditTodo}>
        <div>
            <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
            <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
            <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  )
}

export default EditTodo
