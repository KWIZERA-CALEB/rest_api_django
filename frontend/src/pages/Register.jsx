import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/registerservice'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUsernameChange = (e)=> {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e)=> {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e)=> {
        setEmail(e.target.value)
    }

    const handleRegister = async (e)=> {
        e.preventDefault()
        const data = {
            username,
            password,
            email
        }
        try {
            const response = await registerUser(data)
            console.log(response)
            navigate('/login')
        }catch(error) {
            console.log(error)
            throw error
        }
    }


  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
            <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )

}

export default Register
