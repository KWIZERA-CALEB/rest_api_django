import axios from 'axios'

const BASE_API_URL = 'http://127.0.0.1:8000'

export const fetchTodos = async ()=> {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/todos/`)
        return response.data
    }catch(error) {
        console.log(error)
        throw error
    }
}

export const destroyTodo = async (id)=> {
    try {
        const destroy = await axios.delete(`${BASE_API_URL}/api/delete/todo/${id}/`)
        return destroy.data
    }catch(error) {
        console.log(error)
        throw error
    }
}
