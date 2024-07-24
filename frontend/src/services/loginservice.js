import axios from 'axios'

const BASE_API_URL = 'http://127.0.0.1:8000'

export const loginUser = async (data)=> {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/token/`, data)
        return response.data.access
    }catch(error) {
        console.log(error)
        throw error
    }
}

