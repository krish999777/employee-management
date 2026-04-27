import {Navigate} from 'react-router-dom'
import {getPayloadFromToken} from '../utils/jwt.js'

export default function(){
    const token=localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login"/>
    }
    const payload=getPayloadFromToken(token)
    if(payload.role==='admin'){
        return <Navigate to="/employees"/>
    }else{
        return <Navigate to="/account"/>
    }
}