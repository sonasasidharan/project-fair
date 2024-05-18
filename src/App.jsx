import './App.css'
import './bootstrap.min.css'
import{Routes,Route} from 'react-router-dom'
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Footer from './Components/Footer'
import Auth from './Pages/Auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthContext } from '../Context Api/AuthContext'
import { useContext } from 'react'

function App() {
  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

  return (
    <>
   <Routes>
    <Route path='/' element={<Landing/>}></Route>
    <Route path='/dash' element={authStatus?<Dashboard/>:<Landing/>}></Route> 
    <Route path='/pro' element={authStatus?<Projects/>:<Landing/>}></Route>
    <Route path='/log' element={<Login/>}></Route>
    <Route path='/reg' element={<Register/>}></Route>
    <Route path='/auth' element={<Auth/>}></Route>
   </Routes>
   <Footer/>
   <ToastContainer/>
    </>
  )
}

export default App
