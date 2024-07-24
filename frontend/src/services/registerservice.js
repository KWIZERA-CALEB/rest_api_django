import axios from 'axios'

const BASE_API_URL = "http://127.0.0.1:8000"

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