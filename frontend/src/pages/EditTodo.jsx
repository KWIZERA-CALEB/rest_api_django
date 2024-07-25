import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchSingleTodo, editSingleTodo } from '../services/todoservice'
import axios from 'axios';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const BASE_API_URL = 'http://127.0.0.1:8000';

const EditTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [todo, setTodo] = useState({id:'', title:'', description:''})
    const [userData, setUserData] = useState(null);
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()


    const handleTitleChange = (e)=> {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e)=> {
        setDescription(e.target.value)
    }

    useEffect(()=> {
        const fetchTodoDetails = async ()=> {
            try{
                const todo = await fetchSingleTodo(id)
                setTodo(todo)
                setTitle(todo.title)
                setDescription(todo.description)
            }catch(error) {
                console.log(error)
                throw error
            }
        }

        fetchTodoDetails()
    }, [])

    const handleEditTodo = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const data = {
                title,
                description
            }

            const newTodo = await editSingleTodo(id, data)
            setLoading(false)
            setOpen(true)
            setSuccessOpen(true)
            setTimeout(()=> {
                navigate(`/todo/${todo.id}`)
            }, 5000)
            navigate()
            return newTodo
        }catch(error) {
            console.log(error)
            setErrorOpen(true) 
            setOpen(true)
            setLoading(false)
            throw error
        }
    }


      
    useEffect(() => {
        const token = localStorage.getItem('accesstoken');
    
        if (!token) {
          navigate('/');
          return;
        }
      }, [navigate]);
    
      useEffect(() => {
        const fetchLoggedUser = async () => {
          try {
              const token = localStorage.getItem('accesstoken');
              if (!token) {
                  navigate('/');
                  return;
              }
              const response = await axios.get(`${BASE_API_URL}/api/user/`, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              console.log(response.data);
              setUserData(response.data);
          } catch (error) {
            console.log(error);
            throw error;
          }
      };
  
    fetchLoggedUser();
    }, [navigate]);
    
    const handleLogout = ()=> {
        localStorage.removeItem('accesstoken')
        navigate('/')
        return;
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
                    Updated Successfully
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
        <div className="w-full h-[90px] fixed border-b border-solid flex justify-center items-center p-[14px] border-gray-300">
            <div className="font-black text-slate-800 text-[25px] logo">Todo Mate</div>
        </div>

        <div className="pt-[120px] pb-[30px] pr-[50px] pl-[50px] flex flex-row space-x-[6px]">
            <div className="w-full h-[300px] md:w-[80%]">
                <div className="w-full">
                    <form onSubmit={handleEditTodo} className="w-full">
                        <div className="w-full mb-[40px]">
                            <input type="text" placeholder='Title' className="w-full h-[80px] border-b border-slate-500 border-solid outline-none focus:border-blue-500" value={title} onChange={handleTitleChange} />
                        </div>
                        <div className="w-full mb-[40px]">
                            <textarea placeholder='Description' className="w-full h-[120px] border-b border-slate-500 border-solid outline-none focus:border-blue-500" value={description} onChange={handleDescriptionChange} ></textarea>
                        </div>
                        <div>
                            {loading ?
                                <Button type="submit" className="w-full" loading variant="contained" disabled>Updating</Button>
                                    :
                                <Button type="submit" className="w-full" variant="contained">Edit Todo</Button>
                            }                        
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-[20%] rounded-[12px] border-[2px] border-solid border-gray-300 p-[30px] hidden md:block">
                <div className="flex justify-center">
                    <img src="/images/upstream_3.png" className="w-[70px] cursor-pointer border-double mb-[30px] border-4 border-sky-500 rounded-full object-cover object-center" alt="Profile" />
                </div>
                <div className="custom text-slate-600 text-center text-[20px] font-bold uppercase">{userData ? userData.username : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</div>
                <div className="custom text-slate-400 text-center p-[30px] mb-[40px] border-b border-gray-300 border-solid text-[16px] font-bold lowercase">{userData ? userData.email : <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}</div>
                <div className="flex justify-center"><Button className="w-full" color="error" onClick={handleLogout} variant="contained">Logout</Button></div>
            </div>
        </div>

        <div className="w-full h-[90px] fixed bottom-0 font-bold text-slate-500 custom flex justify-center items-center border-t-[2px] border-gray-300 p-[14px]">Designed with &nbsp;<span className="text-red-500">❤</span>&nbsp; By Caleb</div>
    </>

  )
}

export default EditTodo
