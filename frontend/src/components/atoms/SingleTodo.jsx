import React, { useEffect, useState } from 'react'
import { fetchTodos, destroyTodo } from '../../services/todoservice'
import { Link } from 'react-router-dom'
import RecSkeleton from './RecSkeleton'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { timeAgo } from '../../utils/formatdate';
import Tooltip from '@mui/material/Tooltip';

const SingleTodo = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const [errorOpen, setErrorOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [img, setImg] = useState('/images/gradient1.jfif')
    

    useEffect(()=> {
        const getTodos = async ()=> {
            try {
                const fetchedTodos = await fetchTodos()
                setTodos(fetchedTodos)
                setLoading(true)
            }catch(error) {
                console.log(error)
                throw error
            }
        }
        
        getTodos()
    }, [])

    const handleDeleteTodo = async (id)=> {
        try {
            const destroy = await destroyTodo(id)
            setTodos(todos.filter(todo => todo.id !== id))
            setOpen(true)
            setSuccessOpen(true)
            return destroy
        }catch(error) {
            console.log(error)
            setErrorOpen(true) 
            setOpen(true)
            throw error
        }
    }

    const imagesForTodos = ['/images/gradient1.jfif','/images/gradient2.jfif','/images/gradient3.jfif','/images/gradient4.jfif','/images/gradient5.jfif']
    
    const getRandomText = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    useEffect(()=> {
        const randomImage = ()=> {
            const image = getRandomText(imagesForTodos)
            setImg(image)
        }

        randomImage()
    }, [])
    


    const renderedTodos = []
    for(let i = 0; i < todos.length; i++) {
        renderedTodos.push(
            <>
                
                <div key={todos[i].id} className="p-[30px] relative rounded-[12px] h-[170px] border-[2px] border-solid border-gray-300 hover:border-blue-500 hover:cursor-pointer">
                    <div className="w-full">
                        <img src={img} alt="Image" className="h-[60px] rounded-[12px] w-full object-cover object-center" />
                    </div>
                    <Link to={`/todo/${todos[i].id}`}>
                        <div className="font-bold text-[18px] mb-[12px] hover:text-blue-500 cursor-pointer text-slate-800 uppercase">{todos[i].title}</div>
                        <strong>{timeAgo(todos[i].created)}</strong>
                    </Link>
                    <div className="absolute right-[20px] bottom-[20px]">
                        <IconButton onClick={()=> handleDeleteTodo(todos[i].id)} aria-label="delete">
                            <Tooltip title="Delete" arrow>
                                <DeleteIcon className='hover:cursor-pointer hover:text-red-500' />
                            </Tooltip>
                        </IconButton>
                    </div>
                </div>
                
            </>
        )
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
                    Deleted Successfully
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
      {loading ? renderedTodos : <RecSkeleton />}
    </>
  )
}

export default SingleTodo
