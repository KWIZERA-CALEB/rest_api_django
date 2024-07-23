import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Todos from './pages/Todos'
import SingleTodo from './pages/SingleTodo'



function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/todos" element={<Todos />}></Route>
        <Route path="/todo/{id}" element={<SingleTodo />}></Route>
      </Routes>
    </>
  )
}

export default App
