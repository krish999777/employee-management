import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { getPayloadFromToken } from '../utils/jwt.js'

export default function Navbar() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const {role} = getPayloadFromToken(localStorage.getItem('token'))
    if(!role){
        logout()
    }

    return (
        <nav className="navbar">
            <NavLink to="/" className="logo">EMS</NavLink>

            <div className="nav-links">
                <NavLink to="/account">Account</NavLink>

                {role === 'admin' && (
                    <NavLink to="/employees">Employees</NavLink>
                )}
                <NavLink to="/departments">Departments</NavLink>
            </div>

            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </nav>
    )
}