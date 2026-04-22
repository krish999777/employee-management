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
export async function putEachEmployee(req,res){
    try{
        const paramsId=req.params.id
        if(req.user.role!=='admin'&&req.user.id!==Number(paramsId)){
            return res.status(401).json({error:"Not authorized"})
        }
        let {name,email,department_id}=req.body
        const foundUser=await db.query(`
            SELECT name,email,department_id FROM users WHERE id=$1
        `,[paramsId])
        if(foundUser.rows.length===0){
            return res.status(404).json({error:"User not found"})
        }
        const {name:userName,email:userEmail,department_id:userDepartment_id}=foundUser.rows[0]
        name=name||userName
        email=email||userEmail
        department_id=department_id||userDepartment_id
        const newUser=await db.query(`
            UPDATE users SET name=$1,email=$2,department_id=$3 WHERE id=$4
            RETURNING id,name,email,department_id
        `,[name,email,department_id,paramsId])
        const {name:newName,email:newEmail,department_id:newDepartment,id:newId}=newUser.rows[0]
        res.status(200).json({
            user:{
                name:newName,
                email:newEmail,
                department_id:newDepartment,
                id:newId
            }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }

}
export async function deleteEachEmployeeController(req,res){
    try{
        const paramsId=req.params.id
        if(Number(paramsId)===req.user.id){
            return res.status(409).json({error:"Cannot delete self"})
        }
        const isUser=await db.query(`
            SELECT 1 FROM users WHERE id=$1
        `,[paramsId])
        if(isUser.rows.length===0){
            return res.status(404).json({error:"User not found"})
        }
        await db.query(`DELETE FROM users WHERE id=$1`,[paramsId])
        res.status(204).send()
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
}