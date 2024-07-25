import React, {useState} from 'react'
import { loginUser } from '../services/loginservice'
import { useNavigate, Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleUsernameChange = (e)=> {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e)=> {
        setPassword(e.target.value)
    }

    const handleLogin = async (e)=> {
        e.preventDefault()
        setLoading(true)
        const data = {
            username,
            password
        }
        try {
            const token = await loginUser(data)
            localStorage.setItem('accesstoken', token)
            setLoading(false)
            setOpen(true)
            setSuccessOpen(true)           
            navigate('/todos')
        }catch(error) {
            setErrorOpen(true) 
            setOpen(true)
            setLoading(false)
            console.log(error)
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
        { successOpen ? 
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Loggined Successfully
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
                <div className="font-bold text-slate-500 logo flex justify-center items-center p-[14px]">LOGIN</div>
                <form onSubmit={handleLogin}>
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
                <Link to={'/register'}>
                    <div className="font-bold text-blue-500 underline logo flex justify-center items-center p-[14px]">REGISTER</div>
                </Link>
            </div>
        </div>
        <div className="w-full h-[90px] fixed bottom-0 font-bold text-slate-500 custom flex justify-center items-center border-t-[2px] border-gray-300 p-[14px]">Designed with &nbsp;<span className="text-red-500">❤</span>&nbsp; By Caleb</div>
    </>
  )
}

export default Login
