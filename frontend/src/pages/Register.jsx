import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/registerservice'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [confeti, setConfeti] = useState(false)
    const { width, height } = useWindowSize()
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
        setLoading(true)
        const data = {
            username,
            password,
            email
        }
        try {
            const response = await registerUser(data)
            console.log(response)
            setLoading(false)
            setConfeti(true)
            setOpen(true)
            setSuccessOpen(true)
            setTimeout(()=> {
                navigate('/login')
            }, 5000) 
        }catch(error) {
            console.log(error)
            setErrorOpen(true) 
            setOpen(true)
            setLoading(false)
            throw error
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }

  return (
    <>
        {confeti &&
            <Confetti
            width={width}
            height={height}
        />
        
        }

        { successOpen ? 
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Registered Successfully
                </Alert>
            </Snackbar> 
            :
            null
        }

        { errorOpen ? 
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Error Occurred
                </Alert>
            </Snackbar> 
            :
            null
        }
        <div className='h-[100vh] w-full flex justify-center items-center'>
            <div className='border-[2px] border-solid border-gray-300 rounded-[20px] p-[40px] w-[500px]'>
                <div className="font-bold text-slate-500 logo flex justify-center items-center p-[14px]">REGISTER</div>
                <form onSubmit={handleRegister}>
                    <div className="mb-[30px]">
                        <TextField type="text" label="Email" className="w-full" value={email} onChange={handleEmailChange} variant="standard" />
                    </div>
                    <div className="mb-[30px]">
                        <TextField type="text" label="Username" className="w-full" value={username} onChange={handleUsernameChange} variant="standard" />
                    </div>
                    <div className="mb-[30px]">
                        <TextField type="password" label="Password" className="w-full" value={password} onChange={handlePasswordChange} variant="standard" />
                    </div>
                    <div className="mb-[30px]">
                        {loading ? <Button type="submit" loading className="w-full" variant="contained" disabled>Loading</Button> : <Button type="submit" className="w-full" variant="contained">Login</Button>}
                    </div>
                </form>
                <Link to={'/login'}>
                    <div className="font-bold text-blue-500 underline logo flex justify-center items-center p-[14px]">LOGIN</div>
                </Link>
            </div>
        </div>
        <div className="w-full h-[90px] fixed bottom-0 font-bold text-slate-500 custom flex justify-center items-center border-t-[2px] border-gray-300 p-[14px]">Designed with &nbsp;<span className="text-red-500">❤</span>&nbsp; By Caleb</div>
    </>
  )

}

export default Register
