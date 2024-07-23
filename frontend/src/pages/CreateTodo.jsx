import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTodo } from '../services/todoservice'

const CreateTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()


    const handleTitleChange = (e)=> {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e)=> {
        setDescription(e.target.value)
    }

    const handleAddTodo = async (e) => {
        e.preventDefault()
        try {

            const data = {
                title,
                description
            }

            const newTodo = await addTodo(data)
            navigate('/todos')
            console.log(newTodo)
            return newTodo
        }catch(error) {
            console.log(error)
            throw error
        }
    }
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <div>
            <input type="text" placeholder='Title' value={title} onChange={handleTitleChange} />
        </div>
        <div>
            <input type="text" placeholder='Description' value={description} onChange={handleDescriptionChange} />
        </div>
        <div>
            <button type='submit'>Add Todo</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTodo
