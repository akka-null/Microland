
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
 

  return (
    <>
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
     
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
