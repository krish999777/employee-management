import {Navigate} from 'react-router-dom'
import Navbar from './Navbar'

export default function({children}){
    const token=localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login"/>
    }
    return (
    <>
        <Navbar/>
        {children}
    </>
    )
}