import {verifyToken} from '../utils/jwt.js'

function extractToken(authHeader) {
    if (!authHeader) return null
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return null
    }
    return parts[1]
}
export function authMiddleware(req, res, next) {
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({error:"No token provided"})
    }
    const token=extractToken(authHeader)
    const payload=verifyToken(token)
    if(!payload){
        return res.status(401).json({error:"Not authorized"})
    }
    req.user=payload
    next()
}