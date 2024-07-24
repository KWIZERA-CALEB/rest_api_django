import React, {useState} from 'react'
import { loginUser } from '../services/loginservice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUsernameChange = (e)=> {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e)=> {
        setPassword(e.target.value)
    }

    const handleLogin = async (e)=> {
        e.preventDefault()
        const data = {
            username,
            password
        }
        try {
            const token = await loginUser(data)
            localStorage.setItem('accesstoken', token)
            navigate('/todos')
        }catch(error) {
            console.log(error)
            throw error
        }
    }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
