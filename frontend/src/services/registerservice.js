import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_API_URL

export const registerUser = async (data)=> {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/register/`, data)
        console.log(response.data)
        return response.data
    }catch(error) {
        console.log(error)
        throw error
    }
}