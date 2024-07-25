import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_API_URL

export const loginUser = async (data)=> {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/token/`, data)
        return response.data.access
    }catch(error) {
        console.log(error)
        throw error
    }
}

