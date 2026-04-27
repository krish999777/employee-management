import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Employees from './pages/Employees'
import EachEmployee from './pages/EachEmployee'
import CreateEmployee from './pages/CreateEmployee'
import Account from './pages/Account'
import Departments from './pages/Departments'
import EachDepartments from './pages/EachDepartments'

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
        <Route path='/employees/:id' element={
          <ProtectedRoute>
            <EachEmployee/>
          </ProtectedRoute>
        }/>
        <Route path='/employees/create' element={
          <ProtectedRoute>
            <CreateEmployee/>
          </ProtectedRoute>
        }/>
        <Route path="/account" element={
          <ProtectedRoute>
            <Account/>
          </ProtectedRoute>
        }/>
        <Route path="/departments" element={
          <ProtectedRoute>
            <Departments/>
          </ProtectedRoute>
        }/>
        <Route path="/departments/:id" element={
          <ProtectedRoute>
            <EachDepartments/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}