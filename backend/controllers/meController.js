export function meController(req,res){
    try{
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const {id,role}=req.user;
        res.status(200)
        .json({
            user:{id,role}
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}