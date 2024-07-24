import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Todos from './pages/Todos'
import SingleTodo from './pages/SingleTodo'
import EditTodo from './pages/EditTodo'
import CreateTodo from './pages/CreateTodo'
import Login from './pages/Login'



function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        <Route path="/todos" element={<Todos />} />
        <Route path="/add" element={<CreateTodo />} />

        <Route path="/todo/:id" element={<SingleTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </>
  )
}

export default App
