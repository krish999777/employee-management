export function isAdmin(req,res,next){
    const {role}=req.user
    if(!role||role.toLowerCase()!=='admin'){
        return res.status(403).json({error:"Not authorized"})
    }
    next()
}