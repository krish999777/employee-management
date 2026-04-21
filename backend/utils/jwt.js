import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function generateToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'8h'})
}
export function verifyToken(token){
    if (!token) return null
    try{
        return jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return false
    }
}