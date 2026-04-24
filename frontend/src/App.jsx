import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Employees from './pages/Employees'
export default function(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/employees' element={
          <ProtectedRoute>
            <Employees/>
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}