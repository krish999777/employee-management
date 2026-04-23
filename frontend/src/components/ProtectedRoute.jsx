import {useNavigate} from 'react-router-dom'

export default function({children}){
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    if(!token){
        return navigate('/login')
    }
    return children
}