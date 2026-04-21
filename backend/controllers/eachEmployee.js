import db from '../db.js'

export async function getEachEmployee(req,res){
    try{
        const paramsId=req.params.id
        if (req.user.role !== 'admin' && req.user.id !== Number(paramsId)) {
            return res.status(403).json({error:"Not authorized"})
        }
        const user=await db.query(`
            SELECT users.id,users.name,email,departments.name AS department_name,departments.id AS department_id FROM users
            LEFT JOIN departments ON department_id=departments.id
            WHERE users.id=$1 AND role='employee'
            `,[paramsId])
        if(user.rows.length===0){
            return res.status(404).json({error:"User not found"})
        }
        const {id,name,email,department_name,department_id}=user.rows[0]
        res.status(200).json({
            user:{
                id,name,email,department_name,department_id
            }
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal server error"})
    }
    
}